const corsOpts = {
    origin: `http://localhost:${process.env.PORT || 3000}`,
    methods: [
        'GET',
        'POST',
        `PUT`,
        'PATCH',
        `DELETE`,
    ],
};
export default corsOpts