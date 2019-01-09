import politicalPartyModel from '../model/politicalParty';

const politicalParty = {
  /**
   * 
   * @param {object} req 
   * @param {object} res
   * @returns {object} politicalPartys object 
   */
  //Create politicalParty
  create(req, res) {
    if (!req.body.politicalParty && !req.body.candidateName && !req.body.offices) {
      return res.status(400).send({'message': 'Fields cannot be empty'})
    }
    const politicalParty = politicalPartyModel.create(req.body);
    return res.status(201).send(politicalParty);
    
  },
  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @returns {object} politicalPartys array
   */ 
  //Get all politicalPartys
  getAll(req, res) {
    const politicalPartys = politicalPartyModel.findAll();
    return res.status(200).send(politicalPartys);
  },
  /**
   * 
   * @param {object} req 
   * @param {object} res
   * @returns {object} politicalParty object
   */
  //Get one politicalParty with ID
  getOne(req, res) {
    const politicalParty = politicalPartyModel.findOne(req.params.id);
    if (!politicalParty) {
      return res.status(404).send({'message': 'oopps!!! political Party with this ID cannot be found'});
    }
    return res.status(200).send(politicalParty);
  },
  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @returns {object} updated politicalParty
   */
  //Update politicalParty with ID
  update(req, res) {
    const politicalParty = politicalPartyModel.findOne(req.params.id);
    if (!politicalParty) {
      return res.status(404).send({'message': 'Sorry the politicalParty with the ID was not found'});
    }
    const updatedpoliticalParty = politicalPartyModel.update(req.params.id, req.body)
    return res.status(200).send(updatedpoliticalParty);
  },
  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return statuc code 204 
   */
  //Delete a politicalParty with ID
  delete(req, res) {
    const politicalParty = politicalPartyModel.findOne(req.params.id);
    if (!politicalParty) {
      return res.status(404).send({'message': 'oppss!!! the political Party with the ID cannot be found'});
    }
    const ref = politicalPartyModel.delete(req.params.id);
    return res.status(204).send(ref);
  }
}

export default politicalParty;