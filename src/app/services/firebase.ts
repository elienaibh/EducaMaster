import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  DocumentData,
  QueryDocumentSnapshot,
  WithFieldValue,
  CollectionReference,
  WhereFilterOp,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '@/app/config/firebase';

export const firebaseService = {
  // Firestore Operations
  async getDocument<T = DocumentData>(
    collectionName: string,
    documentId: string
  ): Promise<T | null> {
    try {
      const docRef = doc(db, collectionName, documentId);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? (docSnap.data() as T) : null;
    } catch (error) {
      console.error('Error getting document:', error);
      throw error;
    }
  },

  async setDocument<T extends DocumentData>(
    collectionName: string,
    documentId: string,
    data: WithFieldValue<T>
  ): Promise<void> {
    try {
      const docRef = doc(db, collectionName, documentId);
      await setDoc(docRef, data);
    } catch (error) {
      console.error('Error setting document:', error);
      throw error;
    }
  },

  async updateDocument<T extends DocumentData>(
    collectionName: string,
    documentId: string,
    data: Partial<WithFieldValue<T>>
  ): Promise<void> {
    try {
      const docRef = doc(db, collectionName, documentId);
      await updateDoc(docRef, data as DocumentData);
    } catch (error) {
      console.error('Error updating document:', error);
      throw error;
    }
  },

  async deleteDocument(collectionName: string, documentId: string): Promise<void> {
    try {
      const docRef = doc(db, collectionName, documentId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting document:', error);
      throw error;
    }
  },

  async queryDocuments<T = DocumentData>(
    collectionName: string,
    conditions: {
      field: string;
      operator: WhereFilterOp;
      value: unknown;
    }[],
    orderByField?: string,
    orderDirection?: 'asc' | 'desc',
    limitTo?: number,
    startAfterDoc?: QueryDocumentSnapshot<T>
  ): Promise<T[]> {
    try {
      const collectionRef = collection(db, collectionName) as CollectionReference<T>;
      let q = query(collectionRef);

      // Aplicar condições
      conditions.forEach(({ field, operator, value }) => {
        q = query(q, where(field, operator, value));
      });

      // Aplicar ordenação
      if (orderByField) {
        q = query(q, orderBy(orderByField, orderDirection || 'asc'));
      }

      // Aplicar limite
      if (limitTo) {
        q = query(q, limit(limitTo));
      }

      // Aplicar paginação
      if (startAfterDoc) {
        q = query(q, startAfter(startAfterDoc));
      }

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc: QueryDocumentSnapshot<T>) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Error querying documents:', error);
      throw error;
    }
  },

  // Storage Operations
  async uploadFile(
    path: string,
    file: File | Blob,
    metadata?: Record<string, any>
  ): Promise<string> {
    try {
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, file, metadata);
      return await getDownloadURL(storageRef);
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  },

  async deleteFile(path: string): Promise<void> {
    try {
      const storageRef = ref(storage, path);
      await deleteObject(storageRef);
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  },

  async getFileUrl(path: string): Promise<string> {
    try {
      const storageRef = ref(storage, path);
      return await getDownloadURL(storageRef);
    } catch (error) {
      console.error('Error getting file URL:', error);
      throw error;
    }
  },
};
