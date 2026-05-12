rm(list = ls())
cat("\014")
try(dev.off(dev.list()["RStudioGD"]), silent=TRUE)
set.seed(123)

library(lme4)
library(lmerTest)
library(dplyr)
library(ggplot2)

setwd("/Users/samhutchinson/Desktop/lme_nlp")

predictors     <- c("last_layer_surprisal", "cv_layer_surprisal",
                    "shallow_surprisal", "lang_mae_z", "su_sgm_z")
sgm_predictors <- c("su_sgm_z")

files <- list.files("./lme_data/", pattern = "_lme\\.csv$", full.names = TRUE)
files <- files[!grepl("_no_oov\\.csv$", files)]

results <- data.frame()

# ── Main predictor loop ──────────────────────────────────────────────────────
for (path in files) {
  model_name <- sub("_lme\\.csv$", "", basename(path))
  cat("\n===", model_name, "===\n")
  
  df_full   <- read.csv(path)
  df_no_oov <- read.csv(sub("_lme\\.csv$", "_lme_no_oov.csv", path))
  
  for (pred in predictors) {
    df <- if (pred %in% sgm_predictors) df_no_oov else df_full
    if (all(is.na(df[[pred]]))) {
      cat("  Skipping", pred, "(all NA)\n")
      next
    }
    
    cat("  Fitting", pred, "...")
    
    re <- "(1 | subject) + (1 | stim_id)"
    
    full_model <- lmer(
      as.formula(paste0(
        "meanAmp_z ~ ", pred, " + zipf_freq + word_length + ",
        "n_tokens + word_position + dataset + ", re
      )),
      data = df, REML = FALSE
    )
    
    null_model <- lmer(
      as.formula(paste0(
        "meanAmp_z ~ zipf_freq + word_length + ",
        "n_tokens + word_position + dataset + ", re
      )),
      data = df, REML = FALSE
    )
    
    lrt  <- anova(null_model, full_model)
    daic <- AIC(null_model) - AIC(full_model)
    
    row <- data.frame(
      model     = model_name,
      predictor = pred,
      n_rows    = nrow(df),
      beta      = fixef(full_model)[[pred]],
      se        = sqrt(diag(vcov(full_model)))[[pred]],
      chi2      = lrt$Chisq[2],
      p         = lrt$`Pr(>Chisq)`[2],
      daic      = daic
    )
    results <- bind_rows(results, row)
    
    cat(sprintf(" β=%.3f, ΔAIC=%.1f, p=%.4f\n", row$beta, row$daic, row$p))
    
    print(
      ggplot(results, aes(x = model, y = beta,
                          ymin = beta - 1.96 * se,
                          ymax = beta + 1.96 * se,
                          colour = predictor)) +
        geom_hline(yintercept = 0, linetype = "dashed", colour = "grey60") +
        geom_pointrange(position = position_dodge(width = 0.5)) +
        facet_wrap(~ predictor, scales = "free_y") +
        labs(x = NULL, y = "β (95% CI)", title = "LME results so far") +
        theme_minimal() +
        theme(axis.text.x  = element_text(angle = 45, hjust = 1),
              legend.position = "none")
    )
  }
}

cat("\nDone — main predictors.\n")

results$sig <- ifelse(results$p < .001, "***",
                      ifelse(results$p < .01,  "**",
                             ifelse(results$p < .05,  "*", "")))

write.csv(results, "lme_results.csv", row.names = FALSE)
cat("Saved lme_results.csv\n")

print(
  ggplot(results, aes(x = predictor, y = model, fill = daic)) +
    geom_tile() +
    geom_text(aes(label = round(daic, 1)), size = 3) +
    scale_fill_gradient2(low = "white", high = "steelblue",
                         name = "ΔAIC\n(higher = better)") +
    labs(x = NULL, y = NULL, title = "Predictor fit improvement over null (ΔAIC)") +
    theme_minimal() +
    theme(axis.text.x = element_text(angle = 30, hjust = 1))
)

# ── Layer-wise surprisal analysis ────────────────────────────────────────────
# Null model is reused across all layers within a model to avoid redundant fits.
cat("\n\n=== Layer-wise surprisal analysis ===\n")

layer_results <- data.frame()

for (path in files) {
  model_name <- sub("_lme\\.csv$", "", basename(path))
  df         <- read.csv(path)
  
  layer_cols <- grep("^layer_\\d+$", names(df), value = TRUE)
  if (length(layer_cols) == 0) {
    cat("\n  [", model_name, "] no layer columns — skipping\n")
    next
  }
  layer_cols <- layer_cols[order(as.integer(sub("layer_", "", layer_cols)))]
  n_layers   <- length(layer_cols)
  
  cat(sprintf("\n=== %s  (%d layers) ===\n", model_name, n_layers))
  
  re <- "(1 | subject) + (1 | stim_id)"
  
  # Fit null once — reused for every layer LRT
  null_model <- lmer(
    meanAmp_z ~ zipf_freq + word_length + n_tokens + word_position + dataset +
      (1 | subject) + (1 | stim_id),
    data = df, REML = FALSE
  )
  null_aic <- AIC(null_model)
  
  for (layer_col in layer_cols) {
    layer_idx <- as.integer(sub("layer_", "", layer_col))
    if (all(is.na(df[[layer_col]]))) next
    
    full_model <- lmer(
      as.formula(paste0(
        "meanAmp_z ~ ", layer_col, " + zipf_freq + word_length + ",
        "n_tokens + word_position + dataset + ", re
      )),
      data = df, REML = FALSE
    )
    
    lrt  <- anova(null_model, full_model)
    daic <- null_aic - AIC(full_model)
    
    row <- data.frame(
      model    = model_name,
      layer    = layer_idx,
      n_layers = n_layers,
      n_rows   = nrow(df),
      beta     = fixef(full_model)[[layer_col]],
      se       = sqrt(diag(vcov(full_model)))[[layer_col]],
      chi2     = lrt$Chisq[2],
      p        = lrt$`Pr(>Chisq)`[2],
      daic     = daic
    )
    layer_results <- bind_rows(layer_results, row)
    
    cat(sprintf("  layer_%02d  β=%.3f  ΔAIC=%.1f  p=%.4f\n",
                layer_idx, row$beta, row$daic, row$p))
  }
}

cat("\nDone — layers.\n")

layer_results$sig       <- ifelse(layer_results$p < .001, "***",
                                  ifelse(layer_results$p < .01,  "**",
                                         ifelse(layer_results$p < .05,  "*", "")))
# Relative depth: 0 = first layer, 1 = last layer — comparable across model sizes
layer_results$layer_pct <- layer_results$layer / (layer_results$n_layers - 1)

write.csv(layer_results, "lme_layer_results.csv", row.names = FALSE)
cat("Saved lme_layer_results.csv\n")

# ── Layer profile plots ───────────────────────────────────────────────────────

# Plot 1: ΔAIC by absolute layer, one panel per model
print(
  ggplot(layer_results, aes(x = layer, y = daic)) +
    geom_hline(yintercept = 0, linetype = "dashed", colour = "grey60") +
    geom_line(colour = "steelblue") +
    geom_point(aes(colour = daic > 0), size = 1.5, show.legend = FALSE) +
    scale_colour_manual(values = c("FALSE" = "grey60", "TRUE" = "steelblue")) +
    facet_wrap(~ model, scales = "free_x") +
    labs(x = "Layer", y = "ΔAIC (higher = better)",
         title = "Layer-wise surprisal fit over null") +
    theme_minimal() +
    theme(strip.text = element_text(size = 7))
)

# Plot 2: overlaid normalized profiles — all models on same 0–1 depth axis
print(
  ggplot(layer_results, aes(x = layer_pct, y = daic, colour = model)) +
    geom_hline(yintercept = 0, linetype = "dashed", colour = "grey60") +
    geom_line(alpha = 0.8) +
    geom_point(size = 1, alpha = 0.6) +
    labs(x = "Relative depth (0 = first layer, 1 = last)",
         y = "ΔAIC (higher = better)",
         colour = NULL,
         title = "Layer-wise surprisal: normalized depth profiles") +
    theme_minimal() +
    theme(legend.position = "bottom",
          legend.text = element_text(size = 7))
)
