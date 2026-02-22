# MINI BUSINESS PLAN — RoastMyResume
## "Your Resume Gets Roasted" 🔥

**Date** : 21 fevrier 2026
**Auteur** : Benjamin Schindler / SASU Pelegrinus
**Domaines** : roastmyresume.pro (US) / roastmyresume.fr (FR)

---

## 1. RESUME EXECUTIF

RoastMyResume est une app SaaS virale qui utilise l'IA pour "roaster" les CV avec humour, puis propose une version corrigee et optimisee ATS. Modele freemium : le roast est gratuit (viral), la correction est payante.

**Objectif** : 1 000 utilisateurs payants en 6 mois = $60K ARR

---

## 2. PROBLEME

- 75% des CV sont rejetes par les ATS (Applicant Tracking Systems) avant d'etre lus par un humain
- Les services de relecture de CV coutent $100-500 chez les pros
- Les candidats ne savent pas POURQUOI leur CV ne marche pas
- Les outils existants sont ennuyeux et generiques

## 3. SOLUTION

Un outil fun, viral et abordable qui :
1. **ROAST** (gratuit) : L'IA analyse le CV avec humour → score, problemes, conseils
2. **FIX** (payant) : L'IA reecrit le CV de maniere professionnelle, optimise ATS
3. **SHARE** (viral) : Les utilisateurs partagent leur score sur les reseaux sociaux

---

## 4. MODELE ECONOMIQUE

### Pricing US (USD)

| Tier | Prix | Ce qu'on vend |
|------|------|---------------|
| **Gratuit** | $0 | Roast complet + score + partage |
| **Quick Fix** | $4.99 one-shot | CV reecrit + ATS optimise |
| **Pro Package** | $9.99 one-shot | CV + cover letter + LinkedIn bio |
| **Career Boost** | $19.99 one-shot | Tout + interview prep + 5 versions |

### Projection revenus

| Metrique | Mois 1 | Mois 3 | Mois 6 | Mois 12 |
|----------|--------|--------|--------|---------|
| Visiteurs/mois | 5 000 | 20 000 | 50 000 | 100 000 |
| Roasts gratuits | 1 000 | 5 000 | 15 000 | 30 000 |
| Taux conversion | 3% | 4% | 5% | 5% |
| Clients payants | 30 | 200 | 750 | 1 500 |
| Panier moyen | $7 | $8 | $9 | $9 |
| **Revenu mensuel** | **$210** | **$1 600** | **$6 750** | **$13 500** |
| **Revenu cumule** | $210 | $3 410 | $18 960 | **$91 800** |

### Mix de ventes estime
- Quick Fix ($4.99) : 50% des ventes
- Pro Package ($9.99) : 35% des ventes
- Career Boost ($19.99) : 15% des ventes
- **Panier moyen** : ~$8.50

---

## 5. COUTS

### Couts fixes mensuels

| Poste | Cout/mois | Notes |
|-------|-----------|-------|
| Vercel (hosting) | $0 | Free tier (suffisant jusqu'a ~100K visites) |
| Supabase | $0 | Free tier (500MB, 50K requetes) |
| Domaines (.pro + .fr) | ~$1.30 | ~$16/an |
| **Total fixe** | **~$1.30/mois** | |

### Couts variables (par roast)

| Poste | Cout unitaire | Notes |
|-------|---------------|-------|
| Claude API (roast) | ~$0.015 | ~1500 tokens input + 2000 output (Sonnet) |
| Claude API (fix) | ~$0.025 | ~2000 tokens input + 3000 output |
| Stripe fees | 2.9% + $0.30 | Par transaction |
| **Total par roast gratuit** | **$0.015** | |
| **Total par vente Quick Fix** | **$0.49** | API + Stripe fees |
| **Total par vente Pro** | **$0.56** | API + Stripe fees |
| **Total par vente Career** | **$0.93** | API + Stripe fees |

### Marges

| Tier | Prix | Cout | **Marge** | **% Marge** |
|------|------|------|-----------|-------------|
| Quick Fix | $4.99 | $0.49 | **$4.50** | **90%** |
| Pro Package | $9.99 | $0.56 | **$9.43** | **94%** |
| Career Boost | $19.99 | $0.93 | **$19.06** | **95%** |

> **Marge moyenne : ~92%** — C'est un business SaaS classique avec des marges exceptionnelles.

### Cout des roasts gratuits (acquisition)

| Scenario | Roasts gratuits/mois | Cout API | Cout par client acquis |
|----------|---------------------|----------|----------------------|
| Mois 1 | 1 000 | $15 | $0.50 |
| Mois 6 | 15 000 | $225 | $0.30 |
| Mois 12 | 30 000 | $450 | $0.30 |

> **CAC (cout acquisition client) : ~$0.30-0.50** — Extremement bas compare a la moyenne SaaS ($50-200)

---

## 6. RENTABILITE

| | Mois 1 | Mois 3 | Mois 6 | Mois 12 |
|---|--------|--------|--------|---------|
| Revenus | $210 | $1 600 | $6 750 | $13 500 |
| Couts API (gratuits) | -$15 | -$75 | -$225 | -$450 |
| Couts API (payants) | -$15 | -$105 | -$420 | -$840 |
| Stripe fees | -$15 | -$95 | -$360 | -$720 |
| Hosting/domaines | -$1 | -$1 | -$1 | -$1 |
| **Profit net** | **$164** | **$1 324** | **$5 744** | **$11 489** |
| **Marge nette** | **78%** | **83%** | **85%** | **85%** |

> **Break-even : DES LE MOIS 1** — meme avec 30 clients seulement.
> **Profit annee 1 estime : ~$50 000-90 000**

---

## 7. STRATEGIE D'ACQUISITION (ZERO PUB)

### Phase 1 : Viralite organique (Mois 1-3)
- **Twitter/X** : Poster des roasts anonymises hilarants → les gens veulent essayer
- **LinkedIn** : "J'ai fait roaster mon CV par une IA, score : 2/10 💀" → viral chez les pros
- **Reddit** : r/resumes, r/jobs, r/careerguidance (250K+ membres chacun)
- **TikTok** : Videos courtes "Let's roast this resume" → format tres viral
- **ProductHunt** : Launch day pour un boost initial

### Phase 2 : SEO (Mois 3-6)
- Blog : "Top 10 Resume Mistakes", "ATS Resume Tips", "Free Resume Review"
- Long-tail keywords : "free resume roast", "AI resume checker", "resume score"
- Backlinks naturels via le buzz social

### Phase 3 : Partnerships (Mois 6+)
- Universites et career centers
- Bootcamps (coding, design, marketing)
- Influenceurs carriere sur YouTube/TikTok

### Cout marketing : $0
> Le produit SE VEND LUI-MEME. Le roast gratuit EST le marketing.
> Chaque roast partage = 1 pub gratuite.

---

## 8. CONCURRENCE

| Concurrent | Prix | Difference avec nous |
|------------|------|---------------------|
| Resume.io | $24.95/mois | On est 5x moins cher, one-shot |
| TopResume | $149-349 | On est 30x moins cher |
| Zety | $2.99-24.99/mois | Abo mensuel vs notre one-shot |
| Kickresume | $19/mois | Pas de roast fun/viral |
| **roast-my-resume.com** | Gratuit | Concurrent direct mais basique |

**Notre avantage** : Le ROAST VIRAL gratuit. Personne ne fait du "resume roasting" avec humour comme hook marketing.

---

## 9. ROADMAP PRODUIT

### V1 — MVP (MAINTENANT)
- [x] Roast AI gratuit
- [x] Score + problemes
- [x] Partage social
- [x] 3 tiers pricing
- [ ] Stripe payments live
- [ ] Fix AI (reecriture CV)
- [ ] Domaine custom

### V2 — Growth (Mois 2-3)
- [ ] OG Image dynamique (score dans la preview)
- [ ] Page exemples (roasts publics anonymises)
- [ ] Email capture (newsletter)
- [ ] Analytics
- [ ] Rate limiting
- [ ] A/B test pricing

### V3 — Expansion (Mois 4-6)
- [ ] Version FR (roastmyresume.fr)
- [ ] Module AstroCareer (bonus fun/viral) 🔮
- [ ] Cover letter generator (Pro tier)
- [ ] LinkedIn profile optimization (Pro tier)
- [ ] Interview prep questions (Career tier)

### V4 — Scale (Mois 6-12)
- [ ] API publique (B2B)
- [ ] White-label pour universites/bootcamps
- [ ] App mobile (React Native)
- [ ] Abonnement mensuel optionnel

---

## 10. RISQUES ET MITIGATIONS

| Risque | Impact | Mitigation |
|--------|--------|------------|
| Cout API Claude explose | Moyen | Rate limiting + cache des prompts similaires |
| Concurrent copie le concept | Faible | First-mover advantage + communaute |
| Qualite du roast variable | Moyen | Prompt engineering + feedback loop |
| Stripe/paiements bloquent | Eleve | Tester en mode test d'abord |
| RGPD (donnees CV) | Moyen | Pas de stockage long-terme des CV originaux |

---

## 11. METRIQUES CLES A SUIVRE (KPIs)

| KPI | Objectif Mois 1 | Objectif Mois 6 |
|-----|-----------------|-----------------|
| Visiteurs uniques/mois | 5 000 | 50 000 |
| Roasts generes/mois | 1 000 | 15 000 |
| Taux conversion (roast → achat) | 3% | 5% |
| Panier moyen | $7 | $9 |
| MRR (revenu mensuel) | $210 | $6 750 |
| Partages sociaux/mois | 100 | 2 000 |
| NPS (satisfaction) | >40 | >50 |

---

## 12. RESUME FINANCIER

| | Annee 1 | Annee 2 (projection) |
|---|---------|---------------------|
| Revenus | ~$91 800 | ~$250 000 |
| Couts totaux | ~$15 000 | ~$35 000 |
| **Profit net** | **~$77 000** | **~$215 000** |
| **Marge nette** | **84%** | **86%** |

### Investissement initial : ~$300
- LLC Wyoming : ~$100
- Domaines : ~$16
- Temps de dev : 1 semaine (toi + Claude)
- **ROI premiere annee : 25 600%**

---

## CONCLUSION

RoastMyResume est un micro-SaaS a **forte marge (85%+)**, **zero cout marketing** (viralite native), et **break-even immediat**. Le roast gratuit sert de moteur d'acquisition viral, et la correction payante genere des revenus avec un excellent panier moyen.

**L'objectif realiste : $5 000-10 000/mois en 6 mois.**

La cle du succes : rendre l'experience tellement fun et partageable que les utilisateurs font le marketing a ta place.

🔥 **Let's roast some resumes.**
