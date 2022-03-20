const events = require('express').Router()
const db = require('../models')

const { Event, Stage, Set_Time, Meet_Greet } = db

// FIND ALL BANDS
events.get('/', async (req, res) => {

    try {

        const foundEvents = await Event.findAll()
        res.status(200).json(foundEvents)

    } catch (error) {

        res.status(500).json(error)
    }
})

// FIND A SPECIFIC BAND
events.get('/:name', async (req, res) => {
    try {
        const foundEvent = await Event.findOne({
            where: { name: req.params.name },
            include: [
               {
                   model: Meet_Greet, as: 'meet_greets',
                   include: {
                       model: Band, as: 'band',
                       // extra option to query ban by name if need
                       where: { name: { [Op.like]: `%${req.query.band ? req.query.band: ''}%`}}
                   }

               },
               {
                   model: Set_Time, as: 'set_times',
                   include: [
                       { 
                           model: Band, as: 'band'
                       },
                       {
                           model: Stage, as: 'stage'
                       }
                   ]
               },
               {
                   model: Stage, as: 'stage',
                   include: {
                       model: Stage_Event, as: 'stage_events'
                   }
               }
            ]
        })
        res.status(200).json(foundEvent)
    } catch (error) {
        res.status(500).json(error)
    }
})

// CREATE A BAND
events.post('/', async (req, res) => {

    try {
        const newEvent = await Event.create(req.body)

        res.status(200).json({
            message: 'Successfully inserted a new event',
            data: newEvent
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

// UPDATE A BAND
events.put('/:id', async (req, res) => {
    try {
        const updateEvents = await Event.update(req.body, {
            where: {
                event_id: req.params.id
            }
        })

        res.status(200).json({
            message: `Successfully updated ${updateEvents} event(s)`
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

// DELETE A BAND
events.delete('/:id', async (req, res) => {
    try {
        const deletedEvents = await Event.destroy( {
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedEvents} event(s)`
        })
    } catch (error) {
        res.status(500).json(error)
    }
})
module.exports =  events