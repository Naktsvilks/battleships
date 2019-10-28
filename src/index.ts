import application from './app';

const PORT = 3000;

new application().app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
