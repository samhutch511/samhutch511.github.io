import sys, torch
import numpy as np
import os
import h5py
from SGM import SGMnet
from utils import load_parameters, load_vocabulary, sentence_2int


verbose = False

# Files
vocabulary_filename     = 'lexica/lexicon_30k.xlsx'
sgm_parameters_filename = 'models/SGM=600E_1200GS_01LR_1L_10DP_Adamax_CE_arguments.txt'
sgm_filename            = 'models/SGM=600E_1200GS_01LR_1L_10DP_Adamax_CE.ckpt'
sentences_filename      = 'sentences.txt'


# Load parameters for models
parameters_sgm = load_parameters(sgm_parameters_filename)

# Load pre-trained SGM
sgm = SGMnet.load_from_checkpoint(sgm_filename,
                                  load_data=False,
                                  start_file=None,
                                  voc_size=30002
                                 )

sgm.batch_size = 1
sgm.eval()


# Load vocabulary
vocabulary, _ = load_vocabulary(vocabulary_filename)


# Load sentences
# *** this part has to be modified depending on the format of the         ***
# *** file containing the sentences. Here it assumes that sententences    ***
# *** are presented seperatelly on each line in a plain txt file.         ***
# *** Other more sofisticated preprocessing step might be implemented, if ***
# *** needed.                                                             ***
sentences_list = [sentence.strip() for sentence in open(sentences_filename, 'r').readlines()]


# Encode sentences as integers
tot_missing_tokens     = 0
nr_sentence_with_zeros = 0

# Initialize lists to store embeddings and SU values for each sentence
gestalts_list = []
SUs_list       = []

for sentence in sentences_list:
    
    sentence_split = sentence.split(':')
    sentence_id    = int(sentence_split[0])
    sentence_words = sentence_split[-1].strip().split(' ')
    
    # Convert to integers
    sentence_ints  = sentence_2int(sentence_words, vocabulary)
            
    print([sentence_words[i] for i in zero_indices])
    print(f'{sentence_words}\n{sentence_ints}\t\t{nr_zeros}\t\t{zero_indices}\n')
        
    # Input sequence (add 'SOS')
    sentence_ints      = [30001] + sentence_ints

    # Make it into a Torch tensor
    sentence_input     = torch.LongTensor(sentence_ints).view(1,len(sentence_ints))
                
    # Create a dummy PROBE
    probe = torch.tensor(np.zeros((1, sentence_input.shape[1], 332))).float()
        
    # Create an empty structure to be filled with the sentence SUs
    sentence_SUs      = np.zeros((len(sentence_words)))
        
    # Feed the SGM and generate the Gestalts for each word
    sg, _, _        = sgm.encode([sentence_input, probe, probe])
    sg              = torch.squeeze(sg)
    
    # *** the shape of sg should be [length of sentence, size of gestalt layer] ***
    # *** remember that the length of the sentence is augmented by 1, since the ***
    # *** sentence_ints was prefixed ba an SOS/BOS symbol (line 66).            ***
    
    # Append Gestalts of individual words to the gestalts_list
    for word_embedding in sg:
        
        gestalts_list.append(word_embedding)
        
    # Compute Gestalts Updates and append them to SU_list
    previous_gestalt  = sg[0,:] 
    
    # Iterate over the Gestalts to compute the SUs     
    for n, current_gestalt in enumerate(sg[1:,:]):
                
        # SU (and fill the sub-structure)
        SUs_list.append(torch.mean(torch.abs(current_gestalt - previous_gestalt)).item())
            
        # new previous Gestalt
        previous_gestalt   = current_gestalt

# cast results to numpy arrays
gestalts_list = np.array(gestalts_list)
SUs_list       = np.array(SUs_list)

# Save the arrays to NumPy files
np.save('../data/gestalts_list.npy', gestalts_list)
np.save('../data/SUs_list.npy', SUs_list)

