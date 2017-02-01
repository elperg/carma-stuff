import React, { PropTypes } from 'react';
import { Translate, Localize } from 'react-redux-i18n';
import _ from 'lodash';

import EmailDigestTimepicker from './email-digest-timepicker';

import SVGIconAdd from 'babel!svg-react!../../../lib/svg/icon_add.svg?name=SVGIconAdd';


class EmailDigestForm extends React.Component {

  static propTypes = {
    digestsByProject  : PropTypes.arrayOf(PropTypes.shape({
                  projectId     : PropTypes.number.isRequired,
                  isEnabled     : PropTypes.bool.isRequired,
                  isMerged      : PropTypes.bool.isRequired,
                  order         : PropTypes.number.isRequired,
                  deliveryTimes : PropTypes.array.isRequired
                })).isRequired,
    projects  : PropTypes.array.isRequired,
    onUpdate  : PropTypes.func.isRequired
  };

  state = {
    digestsByProject: []
  };

  constructor(props, context) {
    super(props, context);
    _.bindAll(this, ['addDeliveryTime', 'changeDeliveryTime', 'removeDeliveryTime', 'toggleEnabled', 'toggleMerged']);
  }

  componentWillMount() {
    const digestsByProject = this.assignLocalUids(this.props.digestsByProject);
    this.setState({ digestsByProject });
  }

  componentWillReceiveProps(nextProps) {
    const digestsByProject = this.assignLocalUids(nextProps.digestsByProject);
    this.setState({ digestsByProject });
  }

  assignLocalUids(digestsByProject) {

    // add "localUid"s for tracking state of (particularly new, unsaved) deliveryTimes
    const digests = digestsByProject.map((projectDigest) => {

      const deliveryTimes = projectDigest.deliveryTimes.map((deliveryTime) => {
        return Object.assign({}, deliveryTime, { localUid: _.uniqueId() });
      });

      return Object.assign({}, projectDigest, { deliveryTimes });

    });

    return digests;
  }


  addDeliveryTime(projectId) {

    let digestToEdit = _.find(this.state.digestsByProject, { projectId });
    const otherDigests = _.without(this.state.digestsByProject, digestToEdit);

    digestToEdit.deliveryTimes.push({ localUid: _.uniqueId(), hour: 9, minute: 30 });

    // also set "enabled" to true if they add a time
    digestToEdit.isEnabled = true;

    this.updateDigestsByProject(_.sortBy([...otherDigests, digestToEdit], ['order']));

  }


  changeDeliveryTime(projectId, localUid, newTime) {

    let digestToEdit = _.find(this.state.digestsByProject, { projectId });
    const otherDigests = _.without(this.state.digestsByProject, digestToEdit);

    let deliveryTimeToEdit = _.find(digestToEdit.deliveryTimes, { localUid });
    const otherDeliveryTimes = _.without(digestToEdit.deliveryTimes, deliveryTimeToEdit);

    const [ hour, minute ] = newTime.split(':');
    deliveryTimeToEdit = Object.assign({}, deliveryTimeToEdit, { hour: parseInt(hour), minute: parseInt(minute) });

    digestToEdit.deliveryTimes = _.sortBy([...otherDeliveryTimes, deliveryTimeToEdit], ['hour', 'minute']);

    this.updateDigestsByProject(_.sortBy([...otherDigests, digestToEdit], ['order']));

  }


  removeDeliveryTime(projectId, localUid) {

    let digestToEdit = _.find(this.state.digestsByProject, { projectId });
    const otherDigests = _.without(this.state.digestsByProject, digestToEdit);

    let deliveryTimeToEdit = _.find(digestToEdit.deliveryTimes, { localUid });
    const otherDeliveryTimes = _.without(digestToEdit.deliveryTimes, deliveryTimeToEdit);

    // if it has an idea, flag it for destruction, otherwise, remove it
    if(deliveryTimeToEdit.id !== undefined) {
      deliveryTimeToEdit = Object.assign({}, deliveryTimeToEdit, { destroy: true });
      digestToEdit.deliveryTimes = _.sortBy([...otherDeliveryTimes, deliveryTimeToEdit], ['hour', 'minute']);
    } else {
      digestToEdit.deliveryTimes = otherDeliveryTimes;
    }

    const activeDeliveryTimes = _.filter(digestToEdit.deliveryTimes, (deliveryTime) => {
                                  return (deliveryTime.destroy === undefined || deliveryTime.destroy !== true);
                                });

    // if there are no more delivery times, set 'isEnabled' to FALSE
    if(activeDeliveryTimes.length === 0) {
      digestToEdit.isEnabled = false;
    }

    this.updateDigestsByProject(_.sortBy([...otherDigests, digestToEdit], ['order']));

  }


  updateDigestsByProject(digestsByProject) {

    // remove 'localUid' before firing this.props.onUpdate()
    const projectListing = this.state.digestsByProject.map((projectDigest) => {
      const deliveryTimes = projectDigest.deliveryTimes.map((deliveryTime) => {
        delete deliveryTime.localUid;
        return deliveryTime;
      });
      return Object.assign({}, projectDigest, { deliveryTimes });
    });

    this.props.onUpdate(projectListing);
  }

  toggleMerged(projectId) {

    let digestToEdit = _.find(this.state.digestsByProject, { projectId });
    const otherDigests = _.without(this.state.digestsByProject, digestToEdit);

    digestToEdit.isMerged = !digestToEdit.isMerged;

    this.updateDigestsByProject(_.sortBy([...otherDigests, digestToEdit], ['order']));

  }

  toggleEnabled(projectId) {

    let digestToEdit = _.find(this.state.digestsByProject, { projectId });
    const otherDigests = _.without(this.state.digestsByProject, digestToEdit);

    digestToEdit.isEnabled = !digestToEdit.isEnabled;

    // If we're enabling the digest, populate it with a new delivery time
    // otherwise, clear deliveryTimes
    if(digestToEdit.isEnabled === true) {
      this.addDeliveryTime(projectId);

      // enable 'isMerged' by default
      digestToEdit.isMerged = true;

    } else {
      digestToEdit.deliveryTimes = [];
    }

    this.updateDigestsByProject(_.sortBy([...otherDigests, digestToEdit], ['order']));

  }

  render() {
    // i18n
    const { projects } = this.props;

    // build out the project listing
    const projectListing = this.state.digestsByProject.map((projectDigest) => {

      const project = _.find(projects, { id: projectDigest.projectId });

      const activeDeliveryTimes = _.filter(projectDigest.deliveryTimes, (deliveryTime) => {
                                    return (deliveryTime.destroy === undefined || deliveryTime.destroy !== true);
                                  });

      // build time pickers
      const digestTimePickers = activeDeliveryTimes.map((deliveryTime) => {
          return (<div className='balanced-content' key={deliveryTime.localUid}>
                    <EmailDigestTimepicker
                      time={`${deliveryTime.hour}:${deliveryTime.minute}`}
                      onChange={(newTime) => { this.changeDeliveryTime(project.id, deliveryTime.localUid, newTime); } }
                      onRemove={() => { this.removeDeliveryTime(project.id, deliveryTime.localUid); } }
                    />
                  </div>);
      });

      let editDetailsEl;

      if(projectDigest.isEnabled === true) {

        const mergedCheckedClassName = (projectDigest.isMerged === true) ? ' selected' : '';

        editDetailsEl = (<div>
                          <div className={'form-group checkbox-group' + mergedCheckedClassName}>
                            <div className='form-control'>
                              <div className='checkbox' onClick={() => { this.toggleMerged(project.id)} }></div>
                              <label className='inline' htmlFor={'isEnabled-'+project.id}><Translate value='profiles.edit.merge_email_digest' /></label>
                            </div>
                          </div>

                           <div className='form-group'>
                            <div className='form-control'>
                              <label className='required' htmlFor='user_timezone'>
                                <Translate value='profiles.edit.delivery_times' />
                              </label>
                              <div className='flex-1to1to1 time-pickers'>
                                {digestTimePickers}
                                <div className='balanced-content'>
                                  <span className='add-time' onClick={() => { this.addDeliveryTime(project.id); }}>
                                    <SVGIconAdd /> <Translate value='profiles.edit.add_time' />
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                        </div>);
      }

      const enabledCheckedClassName = (projectDigest.isEnabled === true) ? ' selected' : '';

      return (
        <div key={project.id} className='user-project'>

          <h4>{project.name}</h4>

          <div className={'form-group checkbox-group' + enabledCheckedClassName}>
            <div className='form-control'>
              <div className='checkbox' onClick={() => { this.toggleEnabled(project.id)} }></div>
              <label className='inline' htmlFor={'isEnabled-'+project.id}><Translate value='profiles.edit.send_email_digest' /></label>
            </div>
          </div>

          {editDetailsEl}

        </div>
      );

    });


    return (<div className='email-digests'>{projectListing}</div>);

  }
}

// Export the translate() wrapped version
export default EmailDigestForm;
