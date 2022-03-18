
const states = require('express').Router()
const db = require('../models')


const { State } = db

// FIND ALL STATE

states.get('/', async(req, res) => {

    try {
        const foundStates = await State.findAll()
        res.status(200).json(foundStates)
    } catch (error) {
        res.status(500).json(error)
    }
})

states.get('/:id', async (req, res) => {

    try {
        const foundState = await State.findOne({
            where: { state_id: req.params.id}
        })

        res.status(200).json(foundState)
    } catch (error) {
        res.status(500).json(error)
    }
})

states.post('/', async (req, res) => {
    try {
        const newState = await State.create(req.body)

        res.status(200).json({
            message: 'Successfully inserted a new state',
            data: newState
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

states.put('/:id', async (req, res) => {
    try {
        const updateStates = await State.update(req.body, {
            where: {
                state_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully update ${updateStates} state(s)`
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

states.delete('/:id', async (req, res) => {
    try {
        const deletedStates = await State.destroy( {
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedStates} state(s)`
        })
    } catch (error) {
        res.status(500).json(error)
    }
})
module.exports =  states