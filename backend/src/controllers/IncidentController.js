const db = require('../database/connection')

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await db('incidents').count();

        const incidents = await db('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

        response.set('X-Total-Count', count['count(*)'])

        return response.json(incidents);
    },

    async create(request, response) {
        const { title, description, value } = request.body
        const ong_id = request.headers.authorization
        const [id] = await db('incidents')
            .insert({
                title,
                description,
                value,
                ong_id,
            })
        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params
        const ong_id = request.headers.authorization

        const result = await db('incidents')
            .where('id', id)
            .select('ong_id')
            .first()

        if (result == !ong_id) {
            return response.status(401)
                .send({ "error": "Opereation not permitted" })
        }

        await db('incidents')
            .where('id', id)
            .delete()
        return response.status(204).send()
    }
}