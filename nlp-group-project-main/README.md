# nlp-group-project
NLP Project: 6.8610

Sam's update on data:

We have data now from three experiments:

1) Ryskin, R., Stearns, L., Bergen, L., Eddy, M., Fedorenko, E., & Gibson, E. (2021). An ERP index of real-time error correction within a noisy-channel framework of human communication. Neuropsychologia, 158, 107855.

2) Michaelov, J. A., Bardolph, M. D., Van Petten, C. K., Bergen, B. K., & Coulson, S. (2024). Strong prediction: Language model surprisal explains multiple N400 effects. Neurobiology of language, 5(1), 107-135.

3) Frank, S. L., Otten, L. J., Galli, G., & Vigliocco, G. (2015). The ERP response to the amount of information conveyed by words in sentences. Brain and language, 140, 1-11.

Ryskin et al. and Michaelov et al. are controlled experiments, with sentences selected to drive N400 responses, and the Frank et al. is a naturalistic reading experiment.

**combined_clean_n400.csv**: The data is organized by dataset, subject, sentence, critical word, and the N400 response at the critical word. There's both the average N400 amplitude (averaged over electrodes) and then that value Z-scored within experiment.

**stims_for_modeling.csv**: This is what we'll need for modeling, there's each sentence and the critical word at which to extract the relevant measure.
