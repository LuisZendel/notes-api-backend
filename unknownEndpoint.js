
const endpoint = (req, res) => {
    res.status(404).send({
        error: 'unkonw endpoint'
    });
    console.log('ruta no encontrada ');
};

module.exports = endpoint;