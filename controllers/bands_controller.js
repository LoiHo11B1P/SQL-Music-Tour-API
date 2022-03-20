const bands = require('express').Router()
const db = require('../models')
const { Op } =require('sequelize')

const { Band, Meet_Greet, Event, Set_Time } = db

// FIND BY BAND NAME

bands.get('/', async (req, res) => {

    try {
 
        const foundBands = await Band.findAll({
            order: [ ['available_start_time', 'ASC'] ],
            where: {
                name:{  [Op.like]: `%${req.query.name ? req.query.name: ''}%` }
            }
        })
        res.status(200).json(foundBands)
    } catch (error) {
        res.status(500).json(error)
    }
})


// FIND A SPECIFIC BAND
bands.get('/:name', async (req, res) => {
    try {
        const foundBand = await Band.findOne({
            // find the band
            where: { name: req.params.name },
            // INCLUDE will bring in related table
            include:[ 
                {
                    // find all meet and greet for this band
                    model: Meet_Greet, as: 'meet_greets',
                    include: { 
                        // find all event at these meet and greets or by particular event
                        model:Event, as: "event",
                        where: { name: { [Op.like]: `%${req.query.event ? req.query.event: ''}%` }} 
                    }

                },
                {
                    // find all set time for this band
                    model: Set_Time, as: 'set_times',
                    // find all event at these set times or by particular event
                    include: { model:Event, as: "event" },
                    where: { name: { [Op.like]: `%${req.query.event ? req.query.event: ''}%` }} 
                }
            ]
        })
        res.status(200).json(foundBand)
    } catch (error) {
        res.status(500).json(error)
    }
})

// CREATE A BAND
bands.post('/', async (req, res) => {

    console.log(req.body)
    try {
        const newBand = await Band.create(req.body)

        res.status(200).json({
            message: 'Successfully inserted a new band',
            data: newBand
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

// UPDATE A BAND
bands.put('/:id', async (req, res) => {
    try {
        const updateBands = await Band.update(req.body, {
            where: {
                band_id: req.params.id
            },
            
        })

        res.status(200).json({
            message: `Successfully updated ${updateBands} band(s)`
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

// DELETE A BAND
bands.delete('/:id', async (req, res) => {
    try {
        const deletedBands = await Band.destroy( {
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedBands} band(s)`
        })
    } catch (error) {
        res.status(500).json(error)
    }
})
module.exports =  bands