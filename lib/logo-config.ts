// Centralized logo configuration for LAUGFS Email Signature Generator
// This file contains all logo dimensions and settings used across the application

export interface LogoConfig {
  width: number
  height: number | "auto"
}

export const COMPANY_LOGO_CONFIG: Record<string, LogoConfig> = {
  "anantaya-chilaw": { width: 144, height: 90 },
  "anantaya-passikudah": { width: 144, height: 90 },
  "business-solutions": { width: 180, height: "auto" },
  "eco-sri": { width: 180, height: "auto" },
  engineering: { width: 180, height: "auto" },
  "europe-bv": { width: 180, height: "auto" },
  gas: { width: 180, height: "auto" },
  holdings: { width: 180, height: "auto" },
  international: { width: 180, height: "auto" },
  leisure: { width: 180, height: "auto" },
  "life-sciences": { width: 180, height: "auto" },
  lubricants: { width: 180, height: "auto" },
  "lubricants-bangladesh": { width: 180, height: "auto" },
  maritime: { width: 180, height: "auto" },
  petroleum: { width: 180, height: "auto" },
  power: { width: 180, height: "auto" },
  property: { width: 180, height: "auto" },
  restaurants: { width: 180, height: "auto" },
  rubber: { width: 180, height: "auto" },
  "salt-chemicals": { width: 180, height: "auto" },
  slogal: { width: 180, height: "auto" },
  "southern-petroleum": { width: 180, height: "auto" },
  super: { width: 180, height: "auto" },
  terminals: { width: 180, height: "auto" },
  "usa-llc": { width: 180, height: "auto" },
  custom: { width: 180, height: "auto" },
}

// Helper function to get logo config with fallback
export const getLogoConfig = (logoKey: string): LogoConfig => {
  return COMPANY_LOGO_CONFIG[logoKey] || COMPANY_LOGO_CONFIG.holdings
}

// Company domains configuration
export const COMPANY_DOMAINS: Record<string, { display: string; url: string }> = {
  "anantaya-chilaw": { display: "www.anantaya.lk/chilaw/", url: "https://www.anantaya.lk/chilaw/" },
  "anantaya-passikudah": { display: "www.anantaya.lk/passikudah/", url: "https://www.anantaya.lk/passikudah/" },
  "business-solutions": { display: "www.laugfs.lk", url: "https://www.laugfs.lk/" },
  "eco-sri": { display: "www.ecosri.lk", url: "https://www.ecosri.lk" },
  engineering: { display: "www.laugfsengineering.lk", url: "https://www.laugfsengineering.lk" },
  "europe-bv": { display: "www.laugfs.eu", url: "https://laugfs.eu/" },
  gas: { display: "www.laugfsgas.lk", url: "https://www.laugfsgas.lk" },
  holdings: { display: "www.laugfs.lk", url: "https://www.laugfs.lk" },
  international: { display: "www.laugfsinternational.lk", url: "https://www.laugfsinternational.lk" },
  leisure: { display: "www.laugfs.lk/hospitality", url: "https://www.laugfs.lk/hospitality" },
  "life-sciences": { display: "www.laugfs.lk", url: "https://www.laugfs.lk" },
  lubricants: { display: "www.laugfslubricants.com", url: "https://www.laugfslubricants.com" },
  "lubricants-bangladesh": { display: "www.laugfslubricants.com", url: "https://www.laugfslubricants.com/" },
  maritime: { display: "www.laugfsmaritime.com", url: "https://www.laugfsmaritime.com/" },
  petroleum: { display: "laugfspetroleum.lk", url: "http://laugfspetroleum.lk" },
  power: { display: "laugfspower.lk", url: "https://laugfspower.lk" },
  property: { display: "www.laugfs.lk", url: "https://www.laugfs.lk/" },
  restaurants: { display: "www.jade.lk", url: "https://www.jade.lk" },
  rubber: { display: "www.laugfsrubber.com", url: "https://www.laugfsrubber.com" },
  "salt-chemicals": { display: "www.laugfs.lk", url: "https://www.laugfs.lk" },
  slogal: { display: "www.slogal.com", url: "https://www.slogal.com/" },
  "southern-petroleum": {
    display: "laugfspetroleum.lk/southern-petroleum.php",
    url: "http://laugfspetroleum.lk/southern-petroleum.php",
  },
  super: { display: "laugfsholdings.com/super/", url: "https://laugfsholdings.com/super/" },
  terminals: { display: "www.laugfs.lk/logistics", url: "https://www.laugfs.lk/logistics" },
  "usa-llc": { display: "www.laugfsusa.com", url: "https://laugfsusa.com/" },
  custom: { display: "www.laugfs.lk", url: "https://www.laugfs.lk" },
}

// Helper function to get company domain with fallback
export const getCompanyDomain = (logoKey: string): { display: string; url: string } => {
  return COMPANY_DOMAINS[logoKey] || COMPANY_DOMAINS.holdings
}
