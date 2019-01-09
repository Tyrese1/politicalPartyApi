import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../db';

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
      VALUES($1, $2, $3, $4, $5, $6) returning *`;

    const values = [
      uuidv4(),
      req.body.politicalParty,  
      req.body.candidateName,
      req.body.offices,
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
    const findAllQuery = 'SELECT * FROM politicalPartys';
    try {
      const { rows, rowCount } = await db.query(findAllQuery);
      return res.status(200).send({ rows, rowCount });
    } catch(error) {
      return res.status(400).send(error);
    }
  },
  /**
   * Get A politicalParty 
   * @param {object} req 
   * @param {object} res
   * @returns {object} politicalParty object
   */
  async getOne(req, res) {
    const text = 'SELECT * FROM politicalPartys WHERE id = $1';
    try {
      const { rows } = await db.query(text, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({'message': 'political Party not found'});
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
      SET politicalParty=$1, candidateName=$2, offices=$3,modified_date=$4
      WHERE id=$5 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.id]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'Political Party not found'});
      }
      const values = [
        req.body.politicalParty || rows[0].politicalParty,       
        req.body.candidateName || rows[0].candidateName,
        req.body.offices || rows[0].offices,
        moment(new Date()),
        req.params.id
      ];
      const response = await db.query(updateOneQuery, values);
      return res.status(200).send(response.rows[0]);
    } catch(err) {
      return res.status(400).send(err);
    }
  },
  /**
   * Delete A political Party 
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return statuc code 204 
   */
  async delete(req, res) {
    const deleteQuery = 'DELETE FROM politicalPartys WHERE id=$1 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.params.id]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'political Party not found'});
      }
      return res.status(204).send({ 'message': 'deleted' });
    } catch(error) {
      return res.status(400).send(error);
    }
  }
}

export default politicalParty;
