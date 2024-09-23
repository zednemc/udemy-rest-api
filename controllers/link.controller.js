import { nanoid } from "nanoid"
import { Link } from "../models/link.js"

export const  getLinks = async (req, res) => {
    try {

        const links = await Link.find({uid: req.uid})


        return res.json({links})    
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: 'Server error'})
    }
    
}

export const getLink = async (req, res) => {
    try {
        const {id} = req.params
        console.log(id)
        const link = await Link.findById(id)
        console.log(link)

        if(!link) {
            return res.status(404).json({error: 'Link not found'})
        }

        if(!link.uid.equals(req.uid)) {
            return res.status(401).json({error: 'Not authorized'})
        }

        res.json({link})
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: 'Server error'})
    }
}

export const createLink = async (req, res) => {
    //console.log('createLink', req, res)
    try {
        const {longLink} = req.body

        const link = new Link({longLink, nanoLink: nanoid(6), uid: req.uid})
        const newLink = await link.save()

        return res.status(201).json({newLink})        
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: 'Server error'})
    }
}

export const deleteLink = async (req, res) => {
    try {
        const {id} = req.params
        console.log(id)
        const link = await Link.findById(id)
        console.log(link)

        if(!link) {
            return res.status(404).json({error: 'Link not found'})
        }

        if(!link.uid.equals(req.uid)) {
            return res.status(401).json({error: 'Not authorized'})
        }

        await link.deleteOne()

        res.json({link})
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: 'Server error'})
    }
}