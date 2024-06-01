// useEnrollment.js
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../utils/apiService';
import { useAuth } from '../contexts/AuthContext';

const useEnrollment = () => {
  const { courseSlug } = useParams();
  const { isAuthenticated } = useAuth();
  const [isEnrolled, setIsEnrolled] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrollment = async () => {
      if (!isAuthenticated) {
        setIsEnrolled(false); // Assuming not authenticated means not enrolled
        setLoading(false);
        return;
      }
      
      try {
        const response = await api.get(`/enrollment/${courseSlug}/`);
        setIsEnrolled(response.data.isEnrolled);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching enrollment:', error);
        setLoading(false);
      }
    };

    fetchEnrollment();
  }, [isAuthenticated]);

  return { isEnrolled, loading };
};

export default useEnrollment;
