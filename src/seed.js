import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Doctor from "./models/Doctor.js";

const doctors = [
  {
    name: "Dr. Ayesha Rahman",
    specialty: "Cardiologist",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    experience: "10 years",
    availability: ["09:00 AM - 12:00 PM", "04:00 PM - 07:00 PM"],
    description:
      "Highly experienced cardiologist specializing in heart diseases, preventive care, and patient-centered treatment.",
    hospital: "Labaid Cardiac Hospital",
    location: "Dhanmondi, Dhaka",
    fee: 800,
    rating: 4.9,
    reviewCount: 128,
  },
  {
    name: "Dr. Karim Hassan",
    specialty: "Neurologist",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
    experience: "15 years",
    availability: ["10:00 AM - 01:00 PM", "03:00 PM - 06:00 PM"],
    description:
      "Expert neurologist with extensive experience in treating brain and nervous system disorders.",
    hospital: "Square Hospital",
    location: "Pan Pacific Sonargaon, Dhaka",
    fee: 1200,
    rating: 4.8,
    reviewCount: 95,
  },
  {
    name: "Dr. Fatima Akter",
    specialty: "Pediatrician",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
    experience: "8 years",
    availability: ["09:00 AM - 12:00 PM", "02:00 PM - 05:00 PM"],
    description:
      "Compassionate pediatrician dedicated to providing comprehensive healthcare for children of all ages.",
    hospital: "Apollo Hospitals Dhaka",
    location: "Basundhara, Dhaka",
    fee: 600,
    rating: 4.7,
    reviewCount: 210,
  },
  {
    name: "Dr. Mohammad Ali",
    specialty: "Orthopedic Surgeon",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
    experience: "12 years",
    availability: ["11:00 AM - 02:00 PM", "04:00 PM - 07:00 PM"],
    description:
      "Skilled orthopedic surgeon specializing in joint replacement, sports injuries, and bone fracture treatment.",
    hospital: "United Hospital",
    location: "Gulshan, Dhaka",
    fee: 1000,
    rating: 4.6,
    reviewCount: 78,
  },
  {
    name: "Dr. Nusrat Jahan",
    specialty: "Dermatologist",
    image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&h=400&fit=crop",
    experience: "7 years",
    availability: ["10:00 AM - 01:00 PM", "03:00 PM - 06:00 PM"],
    description:
      "Board-certified dermatologist offering advanced skin care treatments and cosmetic dermatology services.",
    hospital: "Ibn Sina Hospital",
    location: "Dhanmondi, Dhaka",
    fee: 700,
    rating: 4.5,
    reviewCount: 156,
  },
  {
    name: "Dr. Tanvir Ahmed",
    specialty: "General Physician",
    image: "https://images.unsplash.com/photo-1537368910025-700350f59c18?w=400&h=400&fit=crop",
    experience: "9 years",
    availability: ["08:00 AM - 12:00 PM", "02:00 PM - 06:00 PM"],
    description:
      "Experienced general physician providing primary healthcare, health screenings, and chronic disease management.",
    hospital: "Popular Diagnostic Centre",
    location: "Mirpur, Dhaka",
    fee: 500,
    rating: 4.4,
    reviewCount: 342,
  },
  {
    name: "Dr. Sabrina Chowdhury",
    specialty: "Gynecologist",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&sat=-50",
    experience: "11 years",
    availability: ["09:00 AM - 12:00 PM", "04:00 PM - 07:00 PM"],
    description:
      "Dedicated gynecologist offering comprehensive women's health services including prenatal and postnatal care.",
    hospital: "Green Life Hospital",
    location: "Green Road, Dhaka",
    fee: 900,
    rating: 4.8,
    reviewCount: 189,
  },
  {
    name: "Dr. Imran Hossain",
    specialty: "Psychiatrist",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&sat=-30",
    experience: "14 years",
    availability: ["10:00 AM - 01:00 PM", "03:00 PM - 06:00 PM"],
    description:
      "Compassionate psychiatrist specializing in anxiety, depression, and mental health wellness programs.",
    hospital: "National Institute of Mental Health",
    location: "Sher-e-Bangla Nagar, Dhaka",
    fee: 1100,
    rating: 4.7,
    reviewCount: 67,
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Doctor.deleteMany({});
    await Doctor.insertMany(doctors);
    console.log("Database seeded with", doctors.length, "doctors");
    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error.message);
    process.exit(1);
  }
}

seed();
