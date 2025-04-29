import { useLocation } from 'react-router-dom';
import TestimonialForm from '../../layout/Backend/TestimonialForm.jsx';
import '../../layout/Backend/addUpdateFile.css';
import useFunction from '../../hooks/useFunction.jsx';

export default function EditTestimonial() {
    const { handleUpdateTestimonial } = useFunction();
    const location = useLocation();
    const testimonial = location?.state?.testimonial || [];

    return (
        <TestimonialForm method='put' testimonial={testimonial} onPress={handleUpdateTestimonial} />
    );
}