import json
from pathlib import Path
import numpy as np
import pandas as pd


def load_parameters(parameters_filename):
    """
    Load the hyperparameters and training parameters of
    a pre-trained SGM or LM.
    
    Returns:
        parameters (dict): Loaded parameters.
    """
    with open(parameters_filename) as f:
        parameters = json.load(f)
    return parameters


def load_vocabulary(vocabulary_filename):
    """
    Load a vocabulary into a Python dictionary {'word' : int}.
    Provided either as .txt or Excel file.
    
    Returns:
        vocabulary (dict): Vocabulary dictionary.
        inv_vocabulary (dict): Inverse vocabulary dictionary.
    """
    vocabulary = {}
    
    if Path(vocabulary_filename).suffix == '.txt':
        with open(vocabulary_filename, 'r') as voc_in:
            for i, line in enumerate(voc_in.readlines()):
                vocabulary[line.split()[0]] = i + 1
    elif Path(vocabulary_filename).suffix == '.xlsx':
        word_list = pd.read_excel(vocabulary_filename, engine='openpyxl').iloc[:, 0].tolist()
        for i, word in enumerate(word_list):
            vocabulary[word] = i + 1
    
    vocabulary['UNK'] = 0
    vocabulary['EOS'] = len(vocabulary)+1
    vocabulary['SOS'] = len(vocabulary)+1
    
    inv_vocabulary = {v: k for k, v in vocabulary.items()}
    
    return vocabulary, inv_vocabulary


def sentence_2int(sentence, vocabulary):
    """
    Convert sentence to integer representation using vocabulary.
    
    Args:
        sentence (list): List of words.
        vocabulary (dict): Vocabulary dictionary.
        
    Returns:
        encoded_sentence (list): Encoded sentence.
    """
    encoded_sentence = []
    
    for word in sentence:
        word = word.lower()
        if word in vocabulary:
            encoded_sentence.append(vocabulary[word])
        else:
            encoded_sentence.append(0)
    
    return encoded_sentence
