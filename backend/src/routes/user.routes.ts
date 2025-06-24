import { Router } from 'express';

const router: Router = Router();

router.get('/');
router.get('/:id');

export default router;
