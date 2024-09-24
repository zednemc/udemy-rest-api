import { Link } from "../models/link.js"

export const redirectLink = async (req, res) => {

    try {
        const {nanoLink} = req.params
        console.log(nanoLink)
        const link = await Link.findOne({nanoLink})
        console.log(link)

        if(!link) {
            return res.status(404).json({error: 'Link not found'})
        }

        /*if(!link.uid.equals(req.uid)) {
            return res.status(401).json({error: 'Not authorized'})
        }*/

        res.redirect(link.longLink)
        
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: 'Server error'})
    }
}