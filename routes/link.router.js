import {Router} from 'express'
import { createLink, deleteLink, getLink, getLinks, updateLink } from '../controllers/link.controller.js';
import { requireToken } from '../middlewares/requireToken.js';
import { bodyLinkValidator, paramLinkValidator } from '../middlewares/validationResults.js';

const router = Router()

// GET          /api/v1/links       all links
// GET          /api/v1/links/:id   single link
// POST         /api/v1/links       create link
// PATCH/PUT    /api/v1/links/:id   update link
// DELETE       /api/v1/links/:id   delete link  

router.get('/', requireToken, getLinks)
// CRUD tradicional
//router.get('/:id', requireToken, paramLinkValidator, getLinkV1)
router.get('/:nanoLink', getLink)
router.post('/', requireToken, bodyLinkValidator, createLink)
router.patch('/:id', requireToken, paramLinkValidator, bodyLinkValidator, updateLink)
router.delete('/:id', requireToken, paramLinkValidator, deleteLink)

export default router;