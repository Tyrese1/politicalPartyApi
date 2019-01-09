import moment from 'moment';
import uuidv4 from 'uuid/v4';
//import db from '../db';

const politicalParty  = {
  /**
   * Create A politicalParty 
   * @param {object} req 
   * @param {object} res
   * @returns {object} politicalParty object 
   */
  async create(req, res) {
    const createQuery = `INSERT INTO
      politicalPartys(id, politicalParty, candidateName, offices, created_date, modified_date)
      VALUES($1, $2, $3, $4, $5) returning *`;
    const values = [
      uuidv4(),
      req.body.politicalParty,      
      req.user.id,
      moment(new Date()),
      moment(new Date())
      
    ];
   

    try {
      const { rows } = await db.query(createQuery, values);
      return res.status(201).send(rows[0]);
    } catch(error) {
      return res.status(400).send(error);
      
    }
  },
  /**
   * Get All politicalPartys
   * @param {object} req 
   * @param {object} res 
   * @returns {object} politicalPartys array
   */
  async getAll(req, res) {
    const findAllQuery = 'SELECT * FROM politicalPartys WHERE id = $1';
    try {
      const { rows, rowCount } = await db.query(findAllQuery, [req.user.id]);
      return res.status(200).send({ rows, rowCount });
    } catch(error) {
      return res.status(400).send(error);
    }
  },
  /**
   * Get A politicalParty 
   * @param {object} req 
   * @param {object} res
   * @returns {object} politicalParty  object
   */
  async getOne(req, res) {
    const text = 'SELECT * FROM politicalPartys WHERE id = $1 AND id = $2';
    try {
      const { rows } = await db.query(text, [req.params.id, req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({'message': 'politicalParty  not found'});
      }
      return res.status(200).send(rows[0]);
    } catch(error) {
      return res.status(400).send(error)
    }
  },
  /**
   * Update A politicalParty 
   * @param {object} req 
   * @param {object} res 
   * @returns {object} updated politicalParty 
   */
  async update(req, res) {
    const findOneQuery = 'SELECT * FROM politicalPartys WHERE id=$1';
    const updateOneQuery =`UPDATE politicalPartys
      SET politicalParty=$1,modified_date=$2
      WHERE id=$3 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.id, req.user.id]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'politicalParty not found'});
      }
      const values = [
        req.body.politicalParty || rows[0].politicalParty,       
        moment(new Date()),
        req.params.id,
        req.user.id
      ];
      const response = await db.query(updateOneQuery, values);
      return res.status(200).send(response.rows[0]);
    } catch(err) {
      return res.status(400).send(err);
    }
  },
  /**
   * Delete A politicalParty 
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return statuc code 204 
   */
  async delete(req, res) {
    const deleteQuery = 'DELETE FROM politicalPartys WHERE id=$1 AND returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.params.id, req.user.id]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'politicalParty not found'});
      }
      return res.status(204).send({ 'message': 'deleted' });
    } catch(error) {
      return res.status(400).send(error);
    }
  }
}

export default politicalParty;