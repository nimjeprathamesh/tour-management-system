import useFunction from "../../hooks/useFunction.jsx";
import TestimonialForm from "../../layout/Backend/TestimonialForm.jsx";
import '../../layout/Backend/addUpdateFile.css';

export default function NewTestimonial() {
    const { handleAddTestimonial } = useFunction();

    return (
        <TestimonialForm method='post' onPress={handleAddTestimonial} />
    );
}