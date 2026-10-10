"use client";

import React, { useState } from 'react';
import { useLanguageStore } from '@/store/useLanguageStore';
import { dictionaries } from '@/i18n/dictionaries';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, ChevronRight, Sparkles, ChevronDown, Search, UserX } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Country, State, City } from 'country-state-city';

type LoginStep = 'PHONE' | 'OTP' | 'PROMPT_REGISTER' | 'REGISTER' | 'SUCCESS';

const COUNTRY_CODES = [
  { code: "+93", country: "Afghanistan" },
  { code: "+358", country: "Aland Islands" },
  { code: "+355", country: "Albania" },
  { code: "+213", country: "Algeria" },
  { code: "+1684", country: "AmericanSamoa" },
  { code: "+376", country: "Andorra" },
  { code: "+244", country: "Angola" },
  { code: "+1264", country: "Anguilla" },
  { code: "+1268", country: "Antigua and Barbuda" },
  { code: "+54", country: "Argentina" },
  { code: "+374", country: "Armenia" },
  { code: "+297", country: "Aruba" },
  { code: "+61", country: "Australia" },
  { code: "+43", country: "Austria" },
  { code: "+994", country: "Azerbaijan" },
  { code: "+1242", country: "Bahamas" },
  { code: "+973", country: "Bahrain" },
  { code: "+880", country: "Bangladesh" },
  { code: "+1246", country: "Barbados" },
  { code: "+375", country: "Belarus" },
  { code: "+32", country: "Belgium" },
  { code: "+501", country: "Belize" },
  { code: "+229", country: "Benin" },
  { code: "+1441", country: "Bermuda" },
  { code: "+975", country: "Bhutan" },
  { code: "+591", country: "Bolivia" },
  { code: "+387", country: "Bosnia and Herzegovina" },
  { code: "+267", country: "Botswana" },
  { code: "+55", country: "Brazil" },
  { code: "+246", country: "British Indian Ocean Territory" },
  { code: "+673", country: "Brunei Darussalam" },
  { code: "+359", country: "Bulgaria" },
  { code: "+226", country: "Burkina Faso" },
  { code: "+257", country: "Burundi" },
  { code: "+855", country: "Cambodia" },
  { code: "+237", country: "Cameroon" },
  { code: "+1", country: "Canada" },
  { code: "+238", country: "Cape Verde" },
  { code: "+345", country: "Cayman Islands" },
  { code: "+236", country: "Central African Republic" },
  { code: "+235", country: "Chad" },
  { code: "+56", country: "Chile" },
  { code: "+86", country: "China" },
  { code: "+61", country: "Christmas Island" },
  { code: "+61", country: "Cocos (Keeling) Islands" },
  { code: "+57", country: "Colombia" },
  { code: "+269", country: "Comoros" },
  { code: "+242", country: "Congo" },
  { code: "+243", country: "Congo, Democratic Republic" },
  { code: "+682", country: "Cook Islands" },
  { code: "+506", country: "Costa Rica" },
  { code: "+225", country: "Cote d'Ivoire" },
  { code: "+385", country: "Croatia" },
  { code: "+53", country: "Cuba" },
  { code: "+357", country: "Cyprus" },
  { code: "+420", country: "Czech Republic" },
  { code: "+45", country: "Denmark" },
  { code: "+253", country: "Djibouti" },
  { code: "+1767", country: "Dominica" },
  { code: "+1809", country: "Dominican Republic" },
  { code: "+593", country: "Ecuador" },
  { code: "+20", country: "Egypt" },
  { code: "+503", country: "El Salvador" },
  { code: "+240", country: "Equatorial Guinea" },
  { code: "+291", country: "Eritrea" },
  { code: "+372", country: "Estonia" },
  { code: "+251", country: "Ethiopia" },
  { code: "+500", country: "Falkland Islands" },
  { code: "+298", country: "Faroe Islands" },
  { code: "+679", country: "Fiji" },
  { code: "+358", country: "Finland" },
  { code: "+33", country: "France" },
  { code: "+594", country: "French Guiana" },
  { code: "+689", country: "French Polynesia" },
  { code: "+241", country: "Gabon" },
  { code: "+220", country: "Gambia" },
  { code: "+995", country: "Georgia" },
  { code: "+49", country: "Germany" },
  { code: "+233", country: "Ghana" },
  { code: "+350", country: "Gibraltar" },
  { code: "+30", country: "Greece" },
  { code: "+299", country: "Greenland" },
  { code: "+1473", country: "Grenada" },
  { code: "+590", country: "Guadeloupe" },
  { code: "+1671", country: "Guam" },
  { code: "+502", country: "Guatemala" },
  { code: "+44", country: "Guernsey" },
  { code: "+224", country: "Guinea" },
  { code: "+245", country: "Guinea-Bissau" },
  { code: "+592", country: "Guyana" },
  { code: "+509", country: "Haiti" },
  { code: "+39", country: "Holy See (Vatican City State)" },
  { code: "+504", country: "Honduras" },
  { code: "+852", country: "Hong Kong" },
  { code: "+36", country: "Hungary" },
  { code: "+354", country: "Iceland" },
  { code: "+91", country: "India" },
  { code: "+62", country: "Indonesia" },
  { code: "+98", country: "Iran" },
  { code: "+964", country: "Iraq" },
  { code: "+353", country: "Ireland" },
  { code: "+44", country: "Isle of Man" },
  { code: "+972", country: "Israel" },
  { code: "+39", country: "Italy" },
  { code: "+1876", country: "Jamaica" },
  { code: "+81", country: "Japan" },
  { code: "+44", country: "Jersey" },
  { code: "+962", country: "Jordan" },
  { code: "+7", country: "Kazakhstan" },
  { code: "+254", country: "Kenya" },
  { code: "+686", country: "Kiribati" },
  { code: "+850", country: "Korea, Democratic People's Republic" },
  { code: "+82", country: "Korea, Republic of" },
  { code: "+965", country: "Kuwait" },
  { code: "+996", country: "Kyrgyzstan" },
  { code: "+856", country: "Lao" },
  { code: "+371", country: "Latvia" },
  { code: "+961", country: "Lebanon" },
  { code: "+266", country: "Lesotho" },
  { code: "+231", country: "Liberia" },
  { code: "+218", country: "Libya" },
  { code: "+423", country: "Liechtenstein" },
  { code: "+370", country: "Lithuania" },
  { code: "+352", country: "Luxembourg" },
  { code: "+853", country: "Macao" },
  { code: "+389", country: "Macedonia" },
  { code: "+261", country: "Madagascar" },
  { code: "+265", country: "Malawi" },
  { code: "+60", country: "Malaysia" },
  { code: "+960", country: "Maldives" },
  { code: "+223", country: "Mali" },
  { code: "+356", country: "Malta" },
  { code: "+692", country: "Marshall Islands" },
  { code: "+596", country: "Martinique" },
  { code: "+222", country: "Mauritania" },
  { code: "+230", country: "Mauritius" },
  { code: "+262", country: "Mayotte" },
  { code: "+52", country: "Mexico" },
  { code: "+691", country: "Micronesia" },
  { code: "+373", country: "Moldova" },
  { code: "+377", country: "Monaco" },
  { code: "+976", country: "Mongolia" },
  { code: "+382", country: "Montenegro" },
  { code: "+1664", country: "Montserrat" },
  { code: "+212", country: "Morocco" },
  { code: "+258", country: "Mozambique" },
  { code: "+95", country: "Myanmar" },
  { code: "+264", country: "Namibia" },
  { code: "+674", country: "Nauru" },
  { code: "+977", country: "Nepal" },
  { code: "+31", country: "Netherlands" },
  { code: "+599", country: "Netherlands Antilles" },
  { code: "+687", country: "New Caledonia" },
  { code: "+64", country: "New Zealand" },
  { code: "+505", country: "Nicaragua" },
  { code: "+227", country: "Niger" },
  { code: "+234", country: "Nigeria" },
  { code: "+683", country: "Niue" },
  { code: "+672", country: "Norfolk Island" },
  { code: "+1670", country: "Northern Mariana Islands" },
  { code: "+47", country: "Norway" },
  { code: "+968", country: "Oman" },
  { code: "+92", country: "Pakistan" },
  { code: "+680", country: "Palau" },
  { code: "+970", country: "Palestinian Territory" },
  { code: "+507", country: "Panama" },
  { code: "+675", country: "Papua New Guinea" },
  { code: "+595", country: "Paraguay" },
  { code: "+51", country: "Peru" },
  { code: "+63", country: "Philippines" },
  { code: "+48", country: "Poland" },
  { code: "+351", country: "Portugal" },
  { code: "+1787", country: "Puerto Rico" },
  { code: "+974", country: "Qatar" },
  { code: "+262", country: "Reunion" },
  { code: "+40", country: "Romania" },
  { code: "+7", country: "Russia" },
  { code: "+250", country: "Rwanda" },
  { code: "+590", country: "Saint Barthelemy" },
  { code: "+290", country: "Saint Helena" },
  { code: "+1869", country: "Saint Kitts and Nevis" },
  { code: "+1758", country: "Saint Lucia" },
  { code: "+590", country: "Saint Martin" },
  { code: "+508", country: "Saint Pierre and Miquelon" },
  { code: "+1784", country: "Saint Vincent and the Grenadines" },
  { code: "+685", country: "Samoa" },
  { code: "+378", country: "San Marino" },
  { code: "+239", country: "Sao Tome and Principe" },
  { code: "+966", country: "Saudi Arabia" },
  { code: "+221", country: "Senegal" },
  { code: "+381", country: "Serbia" },
  { code: "+248", country: "Seychelles" },
  { code: "+232", country: "Sierra Leone" },
  { code: "+65", country: "Singapore" },
  { code: "+421", country: "Slovakia" },
  { code: "+386", country: "Slovenia" },
  { code: "+677", country: "Solomon Islands" },
  { code: "+252", country: "Somalia" },
  { code: "+27", country: "South Africa" },
  { code: "+34", country: "Spain" },
  { code: "+94", country: "Sri Lanka" },
  { code: "+249", country: "Sudan" },
  { code: "+597", country: "Suriname" },
  { code: "+47", country: "Svalbard and Jan Mayen" },
  { code: "+268", country: "Swaziland" },
  { code: "+46", country: "Sweden" },
  { code: "+41", country: "Switzerland" },
  { code: "+963", country: "Syrian Arab Republic" },
  { code: "+886", country: "Taiwan" },
  { code: "+992", country: "Tajikistan" },
  { code: "+255", country: "Tanzania" },
  { code: "+66", country: "Thailand" },
  { code: "+670", country: "Timor-Leste" },
  { code: "+228", country: "Togo" },
  { code: "+690", country: "Tokelau" },
  { code: "+676", country: "Tonga" },
  { code: "+1868", country: "Trinidad and Tobago" },
  { code: "+216", country: "Tunisia" },
  { code: "+90", country: "Turkey" },
  { code: "+993", country: "Turkmenistan" },
  { code: "+1649", country: "Turks and Caicos Islands" },
  { code: "+688", country: "Tuvalu" },
  { code: "+256", country: "Uganda" },
  { code: "+380", country: "Ukraine" },
  { code: "+971", country: "United Arab Emirates" },
  { code: "+44", country: "United Kingdom" },
  { code: "+1", country: "United States" },
  { code: "+598", country: "Uruguay" },
  { code: "+998", country: "Uzbekistan" },
  { code: "+678", country: "Vanuatu" },
  { code: "+58", country: "Venezuela" },
  { code: "+84", country: "Vietnam" },
  { code: "+1284", country: "Virgin Islands, British" },
  { code: "+1340", country: "Virgin Islands, U.S." },
  { code: "+681", country: "Wallis and Futuna" },
  { code: "+212", country: "Western Sahara" },
  { code: "+967", country: "Yemen" },
  { code: "+263", country: "Zimbabwe" }
];

const getMaxLengthForCountryCode = (code: string) => {
  switch (code) {
    case '+91': return 10; // India
    case '+1': return 10; // US/Canada
    case '+44': return 10; // UK
    case '+61': return 9; // Australia
    case '+971': return 9; // UAE
    case '+966': return 9; // Saudi Arabia
    case '+65': return 8; // Singapore
    case '+60': return 9; // Malaysia
    case '+974': return 8; // Qatar
    case '+968': return 8; // Oman
    case '+965': return 8; // Kuwait
    case '+973': return 8; // Bahrain
    case '+49': return 11; // Germany
    case '+33': return 9; // France
    case '+39': return 10; // Italy
    case '+81': return 10; // Japan
    case '+86': return 11; // China
    case '+7': return 10; // Russia
    case '+55': return 11; // Brazil
    case '+27': return 9; // South Africa
    default: return 15; // ITU E.164 standard max length for unmapped countries
  }
};

export default function LoginPage() {
  const { language } = useLanguageStore();
  const t = dictionaries[language].loginPage;
  const router = useRouter();

  const [step, setStep] = useState<LoginStep>('PHONE');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState(false);
  
  // Registration form state
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [district, setDistrict] = useState('');
  const [isDistrictDropdownOpen, setIsDistrictDropdownOpen] = useState(false);
  const [districtSearch, setDistrictSearch] = useState('');
  const [stateName, setStateName] = useState('');
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
  const [stateSearch, setStateSearch] = useState('');
  const [gender, setGender] = useState('');
  const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false);

  // Dynamic Global State & District Resolution
  const matchedCountry = Country.getAllCountries().find(c => c.phonecode === countryCode.replace('+', ''));
  const availableStates = matchedCountry ? State.getStatesOfCountry(matchedCountry.isoCode) : [];
  const selectedStateObj = availableStates.find(s => s.name === stateName);
  const availableDistricts = selectedStateObj ? City.getCitiesOfState(matchedCountry?.isoCode || '', selectedStateObj.isoCode).map(c => c.name) : [];

  // Mock Database Check
  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    
    // Simulate database lookup
    // For demo purposes: if phone is "9876543210", it's an existing user (Amina).
    // Otherwise, it's a new user.
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone === '919876543210' || cleanPhone === '9876543210') {
      setStep('OTP');
    } else {
      setStep('PROMPT_REGISTER');
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === '123456') {
      setStep('SUCCESS');
      setTimeout(() => {
        router.push('/dashboard'); // Redirect to dashboard after success
      }, 2000);
    } else {
      setOtpError(true);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // After filling registration, go to OTP verification
    setStep('OTP');
  };

  return (
    <main className="min-h-screen bg-background flex flex-col lg:flex-row overflow-hidden">
      
      {/* LEFT SIDE: Motivational Banner (Hidden on mobile, 50% on desktop) */}
      <section className="hidden lg:flex flex-col justify-center w-1/2 bg-foreground text-background p-12 xl:p-20 relative overflow-hidden">
        {/* Abstract Background shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[500px] h-[500px] rounded-full bg-[#FFD700]/20 blur-[100px]" />
          <div className="absolute top-[60%] -right-[10%] w-[600px] h-[600px] rounded-full bg-background/5 blur-[120px]" />
        </div>
        
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center justify-center p-4 bg-[#FFD700]/20 text-[#FFD700] rounded-2xl mb-8">
            <Sparkles className="w-10 h-10 fill-current" />
          </div>
          <h1 className="font-heading font-bold text-5xl xl:text-6xl tracking-tight mb-6 leading-tight">
            {t.leftTitle}
          </h1>
          <p className="text-xl text-background/80 leading-relaxed font-medium">
            {t.leftDesc}
          </p>
        </div>
      </section>

      {/* RIGHT SIDE: Interactive Forms */}
      <section className="w-full lg:w-1/2 min-h-[100dvh] lg:min-h-screen flex flex-col justify-center items-center p-[clamp(1.5rem,5vw,4rem)] py-24 lg:py-0 relative bg-background">
        
        {/* Back to Home Link */}
        <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-medium">
          <ArrowLeft className="w-4 h-4" /> Home
        </Link>

        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: PHONE NUMBER */}
            {step === 'PHONE' && (
              <motion.div
                key="PHONE"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-6"
              >
                <div>
                  <h2 className="font-heading font-bold text-3xl text-foreground mb-2">{t.step1Title}</h2>
                </div>
                
                <form onSubmit={handlePhoneSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2 relative">
                    <label className="text-sm font-bold text-muted-foreground">{t.phoneLabel}</label>
                    <div className="flex gap-2 relative">
                      {/* Country Code Button */}
                      <button 
                        type="button"
                        onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                        className="flex-shrink-0 flex items-center justify-between gap-2 px-4 py-4 rounded-xl border border-border/50 bg-muted/30 focus:bg-background focus:outline-none focus:border-[#FFD700] transition-colors text-lg font-medium w-[120px]"
                      >
                        {countryCode} <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      </button>

                      {/* Phone Input */}
                      <input 
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '');
                          if (val.length <= getMaxLengthForCountryCode(countryCode)) {
                            setPhone(val);
                          }
                        }} 
                        maxLength={getMaxLengthForCountryCode(countryCode)}
                        placeholder="9876543210"
                        className="flex-1 w-full px-4 py-4 rounded-xl border border-border/50 bg-muted/30 focus:bg-background focus:outline-none focus:border-[#FFD700] transition-colors text-lg tracking-wide"
                        required
                      />
                      
                      {/* Searchable Dropdown */}
                      <AnimatePresence>
                        {isCountryDropdownOpen && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full left-0 mt-2 w-full max-w-[300px] bg-card border border-border rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col"
                          >
                            <div className="p-3 border-b border-border/50 relative">
                              <Search className="w-4 h-4 absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground" />
                              <input 
                                type="text"
                                placeholder={t.searchCountry}
                                value={countrySearch}
                                onChange={(e) => setCountrySearch(e.target.value)}
                                className="w-full bg-muted/30 border border-border/50 rounded-lg py-2 pl-9 pr-3 text-sm focus:outline-none focus:border-[#FFD700]"
                                autoFocus
                              />
                            </div>
                            <div className="max-h-[250px] overflow-y-auto p-2 flex flex-col gap-1">
                              {COUNTRY_CODES.filter(c => c.country.toLowerCase().includes(countrySearch.toLowerCase()) || c.code.includes(countrySearch)).length === 0 ? (
                                <div className="text-center py-4 text-sm text-muted-foreground">{t.noCountriesFound}</div>
                              ) : (
                                COUNTRY_CODES.filter(c => c.country.toLowerCase().includes(countrySearch.toLowerCase()) || c.code.includes(countrySearch)).map((c, i) => (
                                  <button
                                    key={i}
                                    type="button"
                                    onClick={() => {
                                      setCountryCode(c.code);
                                      setIsCountryDropdownOpen(false);
                                      setCountrySearch('');
                                    }}
                                    className="flex items-center justify-between w-full text-left px-3 py-2 rounded-lg hover:bg-muted text-sm transition-colors"
                                  >
                                    <span className="font-medium truncate pr-2">{c.country}</span>
                                    <span className="text-muted-foreground flex-shrink-0">{c.code}</span>
                                  </button>
                                ))
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  <button type="submit" className="w-full py-4 bg-foreground text-background font-bold text-lg rounded-xl hover:bg-foreground/90 transition-colors mt-2 flex items-center justify-center gap-2">
                    {t.nextBtn} <ChevronRight className="w-5 h-5" />
                  </button>
                </form>
              </motion.div>
            )}

            {/* STEP 2: PROMPT REGISTER (New User) */}
            {step === 'PROMPT_REGISTER' && (
              <motion.div
                key="PROMPT_REGISTER"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-6 text-center"
              >
                <div className="bg-muted p-6 rounded-2xl border border-border/50 flex flex-col gap-3 items-center">
                  <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center border border-border/50 shadow-sm mb-2">
                    <UserX className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-lg text-foreground font-medium">{t.noAccount}</p>
                  <p className="text-muted-foreground">{t.createOnePrompt}</p>
                </div>
                <div className="flex flex-col gap-3 mt-4">
                  <button 
                    onClick={() => setStep('REGISTER')}
                    className="w-full py-4 bg-[#FFD700] text-foreground font-bold text-lg rounded-xl hover:bg-[#e6c200] transition-colors"
                  >
                    {t.createBtn}
                  </button>
                  <button 
                    onClick={() => setStep('PHONE')}
                    className="w-full py-4 bg-muted text-foreground font-bold text-lg rounded-xl hover:bg-muted/80 transition-colors"
                  >
                    {t.backBtn}
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: REGISTRATION FORM */}
            {step === 'REGISTER' && (
              <motion.div
                key="REGISTER"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-6"
              >
                <div className="flex items-center gap-4 mb-2">
                  <h2 className="font-heading font-bold text-2xl text-foreground">{t.signupTitle}</h2>
                </div>
                
                <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-4">
                  <div className="flex gap-4">
                    <div className="flex flex-col gap-1.5 flex-1">
                      <label className="text-xs font-bold text-muted-foreground uppercase">{t.firstName}</label>
                      <input value={firstName} onChange={e=>setFirstName(e.target.value)} type="text" required className="w-full px-3 py-3 rounded-lg border border-[#FFD700]/30 bg-muted/30 focus:bg-background focus:outline-none focus:border-[#FFD700]" />
                    </div>
                    <div className="flex flex-col gap-1.5 flex-1">
                      <label className="text-xs font-bold text-muted-foreground uppercase">{t.middleName}</label>
                      <input value={middleName} onChange={e=>setMiddleName(e.target.value)} type="text" className="w-full px-3 py-3 rounded-lg border border-[#FFD700]/30 bg-muted/30 focus:bg-background focus:outline-none focus:border-[#FFD700]" />
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-muted-foreground uppercase">{t.lastName}</label>
                    <input value={lastName} onChange={e=>setLastName(e.target.value)} type="text" required className="w-full px-3 py-3 rounded-lg border border-[#FFD700]/30 bg-muted/30 focus:bg-background focus:outline-none focus:border-[#FFD700]" />
                  </div>

                  <div className="flex flex-col gap-1.5 relative">
                    <label className="text-xs font-bold text-muted-foreground uppercase">{t.contactNumber}</label>
                    <div className="flex gap-2 relative">
                      <button 
                        type="button"
                        onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                        className="flex-shrink-0 flex items-center justify-between gap-2 px-3 py-3 rounded-lg border border-[#FFD700]/30 bg-muted/30 focus:bg-background focus:outline-none focus:border-[#FFD700] transition-colors font-medium w-[100px]"
                      >
                        {countryCode} <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      </button>

                      <input 
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '');
                          if (val.length <= getMaxLengthForCountryCode(countryCode)) {
                            setPhone(val);
                          }
                        }} 
                        maxLength={getMaxLengthForCountryCode(countryCode)}
                        placeholder="9876543210"
                        className="flex-1 w-full px-3 py-3 rounded-lg border border-[#FFD700]/30 bg-muted/30 focus:bg-background focus:outline-none focus:border-[#FFD700] transition-colors tracking-wide"
                        required
                      />
                      
                      <AnimatePresence>
                        {isCountryDropdownOpen && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full left-0 mt-1 w-full max-w-[280px] bg-card border border-border rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col"
                          >
                            <div className="p-2 border-b border-border/50 relative">
                              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                              <input 
                                type="text"
                                placeholder={t.searchCountry}
                                value={countrySearch}
                                onChange={(e) => setCountrySearch(e.target.value)}
                                className="w-full bg-muted/30 border border-border/50 rounded-lg py-1.5 pl-8 pr-2 text-sm focus:outline-none focus:border-[#FFD700]"
                                autoFocus
                              />
                            </div>
                            <div className="max-h-[200px] overflow-y-auto p-1.5 flex flex-col gap-1">
                              {COUNTRY_CODES.filter(c => c.country.toLowerCase().includes(countrySearch.toLowerCase()) || c.code.includes(countrySearch)).length === 0 ? (
                                <div className="text-center py-4 text-sm text-muted-foreground">{t.noCountriesFound}</div>
                              ) : (
                                COUNTRY_CODES.filter(c => c.country.toLowerCase().includes(countrySearch.toLowerCase()) || c.code.includes(countrySearch)).map((c, i) => (
                                  <button
                                    key={i}
                                    type="button"
                                    onClick={() => {
                                      setCountryCode(c.code);
                                      setIsCountryDropdownOpen(false);
                                      setCountrySearch('');
                                    }}
                                    className="flex items-center justify-between w-full text-left px-2 py-1.5 rounded-md hover:bg-muted text-sm transition-colors"
                                  >
                                    <span className="font-medium truncate pr-2">{c.country}</span>
                                    <span className="text-muted-foreground flex-shrink-0 text-xs">{c.code}</span>
                                  </button>
                                ))
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 relative z-40">
                    <label className="text-xs font-bold text-muted-foreground uppercase">{t.state}</label>
                    <button 
                      type="button"
                      onClick={() => {
                        setIsStateDropdownOpen(!isStateDropdownOpen);
                        setIsDistrictDropdownOpen(false);
                        setIsGenderDropdownOpen(false);
                      }}
                      className="w-full px-3 py-3 rounded-lg border border-[#FFD700]/30 bg-muted/30 focus:bg-background focus:outline-none focus:border-[#FFD700] text-left flex items-center justify-between"
                    >
                      {stateName || t.chooseState}
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <AnimatePresence>
                      {isStateDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          className="absolute top-full left-0 mt-1 w-full bg-card border border-[#FFD700]/30 rounded-lg shadow-xl overflow-hidden flex flex-col"
                        >
                          <div className="p-2 border-b border-border/50 relative">
                            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <input 
                              type="text"
                              placeholder={t.searchState}
                              value={stateSearch}
                              onChange={(e) => setStateSearch(e.target.value)}
                              className="w-full bg-muted/30 border border-border/50 rounded-lg py-1.5 pl-8 pr-2 text-sm focus:outline-none focus:border-[#FFD700]"
                              autoFocus
                            />
                          </div>
                          <div className="max-h-[200px] overflow-y-auto">
                            {availableStates.filter(s => s.name.toLowerCase().includes(stateSearch.toLowerCase())).length === 0 ? (
                                <div className="text-center py-4 text-sm text-muted-foreground">No states found</div>
                            ) : (
                                availableStates.filter(s => s.name.toLowerCase().includes(stateSearch.toLowerCase())).map((s) => (
                                  <button
                                    key={s.isoCode}
                                    type="button"
                                    onClick={() => {
                                      setStateName(s.name);
                                      setDistrict(''); // Reset district when state changes
                                      setIsStateDropdownOpen(false);
                                      setStateSearch('');
                                    }}
                                    className="w-full px-4 py-2 text-left hover:bg-muted transition-colors text-sm"
                                  >
                                    {s.name}
                                  </button>
                                ))
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="flex flex-col gap-1.5 relative z-30">
                    <label className="text-xs font-bold text-muted-foreground uppercase">{t.district}</label>
                    <button 
                      type="button"
                      disabled={!stateName}
                      onClick={() => {
                        setIsDistrictDropdownOpen(!isDistrictDropdownOpen);
                        setIsStateDropdownOpen(false);
                        setIsGenderDropdownOpen(false);
                      }}
                      className="w-full px-3 py-3 rounded-lg border border-[#FFD700]/30 bg-muted/30 focus:bg-background focus:outline-none focus:border-[#FFD700] text-left flex items-center justify-between disabled:opacity-50"
                    >
                      {district || (stateName ? t.chooseDistrict : t.selectStateFirst)}
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <AnimatePresence>
                      {isDistrictDropdownOpen && availableDistricts.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          className="absolute top-full left-0 mt-1 w-full bg-card border border-[#FFD700]/30 rounded-lg shadow-xl overflow-hidden flex flex-col"
                        >
                          <div className="p-2 border-b border-border/50 relative">
                            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <input 
                              type="text"
                              placeholder={t.searchDistrict}
                              value={districtSearch}
                              onChange={(e) => setDistrictSearch(e.target.value)}
                              className="w-full bg-muted/30 border border-border/50 rounded-lg py-1.5 pl-8 pr-2 text-sm focus:outline-none focus:border-[#FFD700]"
                              autoFocus
                            />
                          </div>
                          <div className="max-h-[200px] overflow-y-auto">
                            {availableDistricts.filter(d => d.toLowerCase().includes(districtSearch.toLowerCase())).length === 0 ? (
                                <div className="text-center py-4 text-sm text-muted-foreground">No districts found</div>
                            ) : (
                                availableDistricts.filter(d => d.toLowerCase().includes(districtSearch.toLowerCase())).map((d) => (
                                  <button
                                    key={d}
                                    type="button"
                                    onClick={() => {
                                      setDistrict(d);
                                      setIsDistrictDropdownOpen(false);
                                      setDistrictSearch('');
                                    }}
                                    className="w-full px-4 py-2 text-left hover:bg-muted transition-colors text-sm"
                                  >
                                    {d}
                                  </button>
                                ))
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="flex flex-col gap-1.5 relative z-20">
                    <label className="text-xs font-bold text-muted-foreground uppercase">{t.gender}</label>
                    <button 
                      type="button"
                      onClick={() => {
                        setIsGenderDropdownOpen(!isGenderDropdownOpen);
                        setIsStateDropdownOpen(false);
                        setIsDistrictDropdownOpen(false);
                      }}
                      className="w-full px-3 py-3 rounded-lg border border-[#FFD700]/30 bg-muted/30 focus:bg-background focus:outline-none focus:border-[#FFD700] text-left flex items-center justify-between"
                    >
                      {gender === 'female' ? t.genderFemale : gender === 'male' ? t.genderMale : gender === 'other' ? t.genderPreferNotToSay : t.choose}
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <AnimatePresence>
                      {isGenderDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          className="absolute top-full left-0 mt-1 w-full bg-card border border-[#FFD700]/30 rounded-lg shadow-xl overflow-hidden"
                        >
                          <button type="button" onClick={() => { setGender('female'); setIsGenderDropdownOpen(false); }} className="w-full px-4 py-2 text-left hover:bg-muted transition-colors text-sm">{t.genderFemale}</button>
                          <button type="button" onClick={() => { setGender('male'); setIsGenderDropdownOpen(false); }} className="w-full px-4 py-2 text-left hover:bg-muted transition-colors text-sm">{t.genderMale}</button>
                          <button type="button" onClick={() => { setGender('other'); setIsGenderDropdownOpen(false); }} className="w-full px-4 py-2 text-left hover:bg-muted transition-colors text-sm">{t.genderPreferNotToSay}</button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <button type="submit" className="w-full py-4 mt-4 bg-foreground text-background font-bold text-lg rounded-xl hover:bg-foreground/90 transition-colors">
                    {t.registerBtn}
                  </button>
                </form>
              </motion.div>
            )}

            {/* STEP 4: OTP VERIFICATION */}
            {step === 'OTP' && (
              <motion.div
                key="OTP"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-6 text-center"
              >
                <div>
                  <h2 className="font-heading font-bold text-3xl text-foreground mb-2">
                    {firstName ? `${t.welcomeBack}, ${firstName}!` : `${t.welcomeBack}, Amina!`}
                  </h2>
                  <p className="text-muted-foreground">
                    {t.enterOtp}
                  </p>
                </div>
                
                <form onSubmit={handleOtpSubmit} className="flex flex-col gap-4 mt-2">
                  <input 
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    autoComplete="one-time-code"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => {
                      setOtp(e.target.value);
                      setOtpError(false);
                    }}
                    placeholder="• • • • • •"
                    className="w-full px-2 py-4 rounded-xl border border-[#FFD700]/30 bg-muted/30 focus:bg-background focus:outline-none focus:border-[#FFD700] transition-colors text-[clamp(1.5rem,5vw,1.875rem)] tracking-[clamp(0.5rem,3vw,1rem)] text-center font-mono"
                    required
                  />
                  {otpError && (
                    <p className="text-destructive text-sm font-bold">{t.errorOtp}</p>
                  )}
                  <button type="submit" className="w-full py-4 bg-[#FFD700] text-foreground font-bold text-lg rounded-xl hover:bg-[#e6c200] transition-colors mt-2">
                    {t.verifyBtn}
                  </button>
                  <button type="button" onClick={() => setStep('PHONE')} className="text-sm font-bold text-muted-foreground hover:text-foreground mt-4">
                    {t.backBtn}
                  </button>
                </form>
              </motion.div>
            )}

            {/* STEP 5: SUCCESS */}
            {step === 'SUCCESS' && (
              <motion.div
                key="SUCCESS"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center gap-4 text-center py-10"
              >
                <div className="w-20 h-20 bg-[#25D366] rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <h2 className="font-heading font-bold text-3xl text-foreground">
                  {t.successOtp}
                </h2>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
