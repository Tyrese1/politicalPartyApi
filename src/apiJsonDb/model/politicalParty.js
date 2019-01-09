import moment from 'moment';
import uuid from 'uuid';

class politicalParty {
  /**
   * class constructor
   * @param {object} data
   */
  constructor() {
    this.politicalPartys = [];
  }
  /**
   * 
   * @returns {object} politicalParty object
   */
  create(data) {
    const newpoliticalParty = {
      id: uuid.v4(),
      politicalParty: data.politicalParty || '',
      candidateName: data.candidateName || '',
      offices: data.offices || '',
      createdDate: moment.now(),
      modifiedDate: moment.now()
    };
    this.politicalPartys.push(newpoliticalParty);
    return newpoliticalParty
  }
  /**
   * 
   * @param {uuid} id
   * @returns {object} politicalParty object
   */
  findOne(id) {
    return this.politicalPartys.find(reflect => reflect.id === id);
  }
  /**
   * @returns {object} returns all politicalPartys
   */
  findAll() {
    return this.politicalPartys;
   
  }
  /**
   * 
   * @param {uuid} id
   * @param {object} data 
   */
  update(id, data) {
    const politicalParty = this.findOne(id);
    const index = this.politicalPartys.indexOf(politicalParty);
    this.politicalPartys[index].politicalParty = data['politicalParty'] || politicalParty.politicalParty; 
    this.politicalPartys[index].modifiedDate = moment.now()
    return this.politicalPartys[index];
  }
  /**
   * 
   * @param {uuid} id 
   */
  delete(id) {
    const politicalParty = this.findOne(id);
    const index = this.politicalPartys.indexOf(politicalParty);
    this.politicalPartys.splice(index, 1);
    return {};
  }
}
export default new politicalParty();