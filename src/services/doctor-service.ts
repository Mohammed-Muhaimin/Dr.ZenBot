
'use server';

/**
 * @fileOverview Service for fetching doctor information.
 *
 * - DoctorInfo - Interface for doctor details.
 * - getDoctorsByConditionsAndArea - Function to retrieve doctors based on diagnoses and area.
 */

export interface DoctorInfo {
  id: string;
  name: string;
  specialty: string;
  address: string;
  phone: string;
  area: string; // General area, e.g., Mysore
  conditionsTreated: string[];
  imageUrl?: string;
}

// Mock database of doctors in Mysore, Karnataka, India
const mockDoctors: DoctorInfo[] = [
  {
    id: 'doc1',
    name: 'Dr. Priya Sharma',
    specialty: 'Cardiology',
    address: '123 Jayalakshmipuram Main Road, Mysore, Karnataka, India',
    phone: '+91 98765 43210',
    area: 'Mysore',
    conditionsTreated: ['Hypertension', 'Arrhythmia', 'Coronary Artery Disease', 'Heart Failure', 'Chest Pain'],
    imageUrl: 'https://picsum.photos/seed/doc1_mysore/300/200',
  },
  {
    id: 'doc2',
    name: 'Dr. Arjun Rao',
    specialty: 'Dermatology',
    address: '456 Kuvempunagar Complex, Mysore, Karnataka, India',
    phone: '+91 98765 43211',
    area: 'Mysore',
    conditionsTreated: ['Eczema', 'Psoriasis', 'Acne', 'Skin Allergies', 'Hair Loss', 'Fungal Infections'],
    imageUrl: 'https://picsum.photos/seed/doc2_mysore/300/200',
  },
  {
    id: 'doc3',
    name: 'Dr. Lakshmi Menon',
    specialty: 'Pediatrics',
    address: '789 Gokulam 3rd Stage, Mysore, Karnataka, India',
    phone: '+91 98765 43212',
    area: 'Mysore',
    conditionsTreated: ['Common Cold', 'Influenza', 'Childhood Vaccinations', 'Developmental Issues', 'Asthma in Children'],
    imageUrl: 'https://picsum.photos/seed/doc3_mysore/300/200',
  },
  {
    id: 'doc4',
    name: 'Dr. Vikram Singh',
    specialty: 'Neurology',
    address: '101 Saraswathipuram, Near Fire Station, Mysore, Karnataka, India',
    phone: '+91 98765 43213',
    area: 'Mysore',
    conditionsTreated: ['Migraine', 'Headache', 'Epilepsy', 'Stroke', 'Parkinson\'s Disease', 'Memory Disorders'],
    imageUrl: 'https://picsum.photos/seed/doc4_mysore/300/200',
  },
  {
    id: 'doc5',
    name: 'Mysore City Clinic - Dr. Ravi Kumar',
    specialty: 'General Practice',
    address: '202 Vontikoppal Circle, Mysore, Karnataka, India',
    phone: '+91 98765 43214',
    area: 'Mysore',
    conditionsTreated: ['Common Cold', 'Influenza', 'Fatigue', 'Minor Injuries', 'General Check-ups', 'Fever', 'Digestive Issues'],
    imageUrl: 'https://picsum.photos/seed/doc5_mysore/300/200',
  },
  {
    id: 'doc6',
    name: 'Dr. Anjali Reddy',
    specialty: 'Endocrinology',
    address: '303 Vijayanagar 2nd Stage, Mysore, Karnataka, India',
    phone: '+91 98765 43215',
    area: 'Mysore',
    conditionsTreated: ['Diabetes', 'Thyroid Disorders', 'Hormonal Imbalances', 'PCOS', 'Osteoporosis'],
    imageUrl: 'https://picsum.photos/seed/doc6_mysore/300/200',
  },
  {
    id: 'doc7',
    name: 'Dr. Rohan Gupta',
    specialty: 'Orthopedics',
    address: '505 J.P. Nagar, Near Water Tank, Mysore, Karnataka, India',
    phone: '+91 98765 43216',
    area: 'Mysore',
    conditionsTreated: ['Fractures', 'Joint Pain', 'Arthritis', 'Sports Injuries', 'Back Pain'],
    imageUrl: 'https://picsum.photos/seed/doc7_mysore/300/200',
  },
  {
    id: 'doc8',
    name: 'Dr. Meera Desai',
    specialty: 'Ophthalmology',
    address: '606 Yadavagiri, Opp. Park, Mysore, Karnataka, India',
    phone: '+91 98765 43217',
    area: 'Mysore',
    conditionsTreated: ['Cataracts', 'Glaucoma', 'Refractive Errors', 'Eye Infections', 'Dry Eyes'],
    imageUrl: 'https://picsum.photos/seed/doc8_mysore/300/200',
  },
   {
    id: 'doc9',
    name: 'Dr. Sameer Patil',
    specialty: 'Psychiatry',
    address: '707 Ramakrishnanagar, Mysore, Karnataka, India',
    phone: '+91 98765 43218',
    area: 'Mysore',
    conditionsTreated: ['Depression', 'Anxiety', 'Stress Management', 'Bipolar Disorder', 'OCD'],
    imageUrl: 'https://picsum.photos/seed/doc9_mysore/300/200',
  },
  {
    id: 'doc10',
    name: 'Cauvery Heart & MultiSpeciality Hospital',
    specialty: 'Multi-Speciality',
    address: 'No 1, Ring Road, Near LIC Circle, Siddhartha Layout, Mysore, Karnataka, India',
    phone: '+91 821 2466 555',
    area: 'Mysore',
    conditionsTreated: ['Hypertension', 'Diabetes', 'Cardiac Care', 'Neurology', 'General Surgery', 'Headache', 'Fractures'],
    imageUrl: 'https://picsum.photos/seed/doc10_mysore/300/200',
  },
  {
    id: 'doc11',
    name: 'Dr. Kavita Iyer',
    specialty: 'Gynecology and Obstetrics',
    address: '818 Chamundipuram, Mysore, Karnataka, India',
    phone: '+91 98765 43219',
    area: 'Mysore',
    conditionsTreated: ['Pregnancy Care', 'Menstrual Disorders', 'PCOS', 'Infertility', 'Menopause'],
    imageUrl: 'https://picsum.photos/seed/doc11_mysore/300/200',
  },
  {
    id: 'doc12',
    name: 'Dr. Suresh Nair',
    specialty: 'Pulmonology',
    address: '929 Lakshmipuram, Mysore, Karnataka, India',
    phone: '+91 98765 43220',
    area: 'Mysore',
    conditionsTreated: ['Asthma', 'COPD', 'Pneumonia', 'Bronchitis', 'Sleep Apnea'],
    imageUrl: 'https://picsum.photos/seed/doc12_mysore/300/200',
  },
  {
    id: 'doc13',
    name: 'Dr. Aarav Mehta',
    specialty: 'General Practice',
    address: '111 T.K. Layout, 4th Block, Mysore, Karnataka, India',
    phone: '+91 98765 43221',
    area: 'Mysore',
    conditionsTreated: ['General Illness', 'Fever', 'Cough', 'Cold', 'Health Checkup', 'Diabetes Management'],
    imageUrl: 'https://picsum.photos/seed/doc13_mysore/300/200',
  },
  {
    id: 'doc14',
    name: 'Apollo BGS Hospitals, Mysore',
    specialty: 'Multi-Speciality',
    address: 'Adichunchanagiri Road, Kuvempunagar, Mysore, Karnataka, India',
    phone: '+91 821 2466 000',
    area: 'Mysore',
    conditionsTreated: ['Cardiac Care', 'Orthopedics', 'Neurology', 'Oncology', 'Pediatrics', 'Emergency Care', 'Diabetes'],
    imageUrl: 'https://picsum.photos/seed/doc14_mysore/300/200',
  },
  {
    id: 'doc15',
    name: 'Dr. Sunita Prasad',
    specialty: 'ENT Specialist',
    address: '222 Hebbal Industrial Area, Mysore, Karnataka, India',
    phone: '+91 98765 43222',
    area: 'Mysore',
    conditionsTreated: ['Sinusitis', 'Tonsillitis', 'Ear Infections', 'Hearing Loss', 'Vertigo'],
    imageUrl: 'https://picsum.photos/seed/doc15_mysore/300/200',
  },
  {
    id: 'doc16',
    name: 'Dr. Rajeshwari Kamal',
    specialty: 'General Practice',
    address: '333 Bogadi Road, Mysore, Karnataka, India',
    phone: '+91 98765 43223',
    area: 'Mysore',
    conditionsTreated: ['Routine Checkups', 'Minor Ailments', 'Vaccinations', 'Hypertension', 'Lifestyle Advice'],
    imageUrl: 'https://picsum.photos/seed/doc16_mysore/300/200',
  },
  {
    id: 'doc17',
    name: 'Columbia Asia Hospital, Mysore (A Manipal Hospital Unit)',
    specialty: 'Multi-Speciality',
    address: 'No. 85-86, Bangalore-Mysore Ring Road Junction, Bannimantap A Layout, Siddiqui Nagar, Mandi Mohalla, Mysore, Karnataka, India',
    phone: '+91 821 2477 000',
    area: 'Mysore',
    conditionsTreated: ['Emergency Care', 'Critical Care', 'Internal Medicine', 'Surgical Specialties', 'Maternity', 'Joint Pain'],
    imageUrl: 'https://picsum.photos/seed/doc17_mysore/300/200',
  },
  {
    id: 'doc18',
    name: 'Dr. Fatima Khan',
    specialty: 'Rheumatology',
    address: '444 Niveditha Nagar, Mysore, Karnataka, India',
    phone: '+91 98765 43224',
    area: 'Mysore',
    conditionsTreated: ['Rheumatoid Arthritis', 'Lupus', 'Gout', 'Ankylosing Spondylitis', 'Fibromyalgia'],
    imageUrl: 'https://picsum.photos/seed/doc18_mysore/300/200',
  },
  {
    id: 'doc19',
    name: 'Sanjeevini Clinic - Dr. Anand Murthy',
    specialty: 'General Practice',
    address: '555 Dattagalli, 3rd Stage, Mysore, Karnataka, India',
    phone: '+91 98765 43225',
    area: 'Mysore',
    conditionsTreated: ['General Health Issues', 'Diabetes', 'Hypertension', 'Common Infections', 'Preventive Care', 'Minor injuries'],
    imageUrl: 'https://picsum.photos/seed/doc19_mysore/300/200',
  },
  {
    id: 'doc20',
    name: 'Dr. Divya Sree',
    specialty: 'Nephrology',
    address: '666 Srirampura 2nd Stage, Mysore, Karnataka, India',
    phone: '+91 98765 43226',
    area: 'Mysore',
    conditionsTreated: ['Kidney Disease', 'Hypertension related to Kidney', 'Dialysis Care', 'Kidney Stones'],
    imageUrl: 'https://picsum.photos/seed/doc20_mysore/300/200',
  },
  {
    id: 'doc21',
    name: 'Arogya Family Clinic - Dr. B. N. Prasad',
    specialty: 'General Practice',
    address: '777 Alanahalli Layout, Mysore, Karnataka, India',
    phone: '+91 98765 43227',
    area: 'Mysore',
    conditionsTreated: ['Family Medicine', 'Chronic Disease Management', 'Allergies', 'Skin Rashes', 'Nutritional Advice'],
    imageUrl: 'https://picsum.photos/seed/doc21_mysore/300/200',
  },
  {
    id: 'doc22',
    name: 'Dr. Ishaan Patel',
    specialty: 'Urology',
    address: '888 Kuvempunagar M Block, Mysore, Karnataka, India',
    phone: '+91 98765 43228',
    area: 'Mysore',
    conditionsTreated: ['Kidney Stones', 'Prostate Issues', 'Urinary Tract Infections', 'Male Infertility'],
    imageUrl: 'https://picsum.photos/seed/doc22_mysore/300/200',
  },
  {
    id: 'doc23',
    name: 'JSS Hospital',
    specialty: 'Multi-Speciality',
    address: 'Mahatma Gandhi Rd, JSS Medical Institutions Campus, SS Nagar, Mysore, Karnataka, India',
    phone: '+91 821 2335 555',
    area: 'Mysore',
    conditionsTreated: ['Various Specialities', 'Emergency Services', 'Inpatient and Outpatient Care', 'Diagnostics', 'Depression'],
    imageUrl: 'https://picsum.photos/seed/doc23_mysore/300/200',
  },
  {
    id: 'doc24',
    name: 'Gokulam Clinic - Dr. Geetha Raj',
    specialty: 'General Practice',
    address: '10 Gokulam Main Road, Gokulam, Mysore, Karnataka, India',
    phone: '+91 98765 43229',
    area: 'Mysore',
    conditionsTreated: ['Common ailments', 'Diabetes screening', 'Blood pressure monitoring', 'Minor burns', 'Stress Management'],
    imageUrl: 'https://picsum.photos/seed/doc24_mysore/300/200',
  },
  {
    id: 'doc25',
    name: 'Dr. Manjunath Hegde',
    specialty: 'Gastroenterology',
    address: '20 Vijayanagar 4th Stage, Mysore, Karnataka, India',
    phone: '+91 98765 43230',
    area: 'Mysore',
    conditionsTreated: ['Acid Reflux', 'Irritable Bowel Syndrome (IBS)', 'Ulcers', 'Liver Diseases', 'Gallstones'],
    imageUrl: 'https://picsum.photos/seed/doc25_mysore/300/200',
  }
];

/**
 * Fetches doctors based on a list of diagnoses and an optional area.
 * @param diagnoses - An array of diagnoses (strings) to match against doctors' treated conditions.
 * @param area - An optional area (string) to filter doctors by. If provided, it must be "Mysore".
 * @returns A promise that resolves to an array of DoctorInfo objects.
 */
export async function getDoctorsByConditionsAndArea(
  diagnoses: string[],
  area?: string
): Promise<DoctorInfo[]> {
  // Simulate an asynchronous database call
  await new Promise(resolve => setTimeout(resolve, 700));

  const lowerCaseDiagnoses = diagnoses.map(d => d.toLowerCase().trim()).filter(d => d); // Filter out empty strings
  const targetArea = "mysore"; // All doctors are in Mysore

  return mockDoctors.filter(doctor => {
    // If area is provided, it must match "mysore" (case-insensitive)
    const areaMatch = area ? area.toLowerCase().trim() === targetArea : true;
    
    if (!areaMatch) return false; // If area is specified and it's not Mysore, don't include

    // If no specific diagnoses are provided (e.g., empty array or array of empty strings after filtering),
    // and area is Mysore (or not specified), then match General Practitioners or Multi-Speciality hospitals.
    if (lowerCaseDiagnoses.length === 0) {
      const generalSpecialties = ['general practice', 'multi-speciality', 'family medicine'];
      return generalSpecialties.includes(doctor.specialty.toLowerCase());
    }

    // If specific diagnoses are provided, match based on them.
    const diagnosisMatch = lowerCaseDiagnoses.some(diagKeyword =>
      doctor.conditionsTreated.some(treatedCond =>
        treatedCond.toLowerCase().includes(diagKeyword)
      ) || doctor.specialty.toLowerCase().includes(diagKeyword) // Also check specialty
    );
    return diagnosisMatch; // Area is Mysore (or not specified), now check diagnosis
  });
}

