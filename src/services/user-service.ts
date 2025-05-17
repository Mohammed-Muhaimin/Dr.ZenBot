
'use server';

import { db } from '@/lib/firebase/config';
import { doc, setDoc, getDoc, collection, addDoc, query, where, getDocs, orderBy, Timestamp, serverTimestamp, writeBatch, deleteDoc } from 'firebase/firestore';
import type { SymptomAnalyzerInput, SymptomAnalyzerOutput } from '@/ai/types/symptom-analyzer.types';

export interface UserProfile {
  uid: string;
  email: string;
  medicalHistory?: string;
  createdAt: Timestamp;
}

export interface SymptomHistoryEntry extends SymptomAnalyzerOutput {
  symptoms: string; // from SymptomAnalyzerInput
  medicalHistoryAtTimeOfAnalysis?: string; // from SymptomAnalyzerInput
  timestamp: Timestamp;
  userId: string;
  id?: string; // Firestore document ID
}


export async function createUserProfile(uid: string, data: { email: string; medicalHistory?: string }): Promise<void> {
  const userDocRef = doc(db, 'users', uid);
  try {
    await setDoc(userDocRef, {
      uid,
      email: data.email,
      medicalHistory: data.medicalHistory || '',
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error creating user profile: ", error);
    throw error;
  }
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const userDocRef = doc(db, 'users', uid);
  try {
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error("Error fetching user profile: ", error);
    throw error;
  }
}

export async function saveSymptomAnalysis(
  userId: string,
  symptomInput: SymptomAnalyzerInput,
  analysisOutput: SymptomAnalyzerOutput
): Promise<string> {
  try {
    const historyCollectionRef = collection(db, 'users', userId, 'symptomHistory');
    const docRef = await addDoc(historyCollectionRef, {
      userId,
      symptoms: symptomInput.symptoms,
      medicalHistoryAtTimeOfAnalysis: symptomInput.medicalHistory,
      potentialConditions: analysisOutput.potentialConditions,
      recommendations: analysisOutput.recommendations,
      timestamp: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error saving symptom analysis: ", error);
    throw error;
  }
}

export async function getUserSymptomHistory(userId: string): Promise<SymptomHistoryEntry[]> {
  try {
    const historyCollectionRef = collection(db, 'users', userId, 'symptomHistory');
    const q = query(historyCollectionRef, orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const history: SymptomHistoryEntry[] = [];
    querySnapshot.forEach((doc) => {
      history.push({ id: doc.id, ...doc.data() } as SymptomHistoryEntry);
    });
    return history;
  } catch (error) {
    console.error("Error fetching symptom history: ", error);
    throw error;
  }
}

export async function deleteUserSymptomHistory(userId: string): Promise<void> {
  try {
    const historyCollectionRef = collection(db, 'users', userId, 'symptomHistory');
    const querySnapshot = await getDocs(historyCollectionRef);
    
    // Firestore batch writes are limited (e.g., 500 operations). 
    // For larger collections, you might need to process in multiple batches.
    // Here, we'll assume the number of history entries per user is manageable for a single batch or sequential deletes.
    if (querySnapshot.empty) {
      return;
    }

    const batch = writeBatch(db);
    querySnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
    
    // Fallback or alternative for very large collections (more robust for >500 items):
    // for (const docSnapshot of querySnapshot.docs) {
    //   await deleteDoc(docSnapshot.ref);
    // }

  } catch (error) {
    console.error("Error deleting user symptom history: ", error);
    throw error;
  }
}
