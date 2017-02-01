import React, { PropTypes } from 'react';
import { Translate, Localize, I18n } from 'react-redux-i18n';
import _ from 'lodash';
import numeral from 'numeral';

// When using babel!svg-react!, we need to actually crawl up the tree, (aliases aren't working)
import SVGIconExport from 'babel!svg-react!../svg/icon_export.svg?name=SVGIconExport';

export class ExportMultipleArticles extends React.Component {

  static propTypes = {
    selectedCount   : PropTypes.number.isRequired,
    totalCount      : PropTypes.number.isRequired,
    actions         : PropTypes.shape({
                        exportSelected  : PropTypes.func.isRequired,
                        exportAll       : PropTypes.func.isRequired
                      }).isRequired
  };

  state = {
    isOpen          : false
  };

  constructor(props, context) {
    super(props, context);
    _.bindAll(this, 'clickExportAll', 'clickExportSelected', 'toggleDropdown');
  }

  toggleDropdown() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  clickExportSelected(format) {
    this.props.actions.exportSelected(format);
  }

  clickExportAll(format) {
    this.props.actions.exportAll(format);
  }

  render() {

    const { totalCount, selectedCount } = this.props;

    const dropdownClassName =  (this.state.isOpen === true) ? ' open' : '';

    // All of the options available when selectedCount > 0
    const exportSelectedOptions = [
      <li ref='selected-heading' key='selected-heading' className='heading'>
        <Translate value='articles.articles_toolbar.export_selected' count={selectedCount} />
      </li>,
      <li ref='csv-selected' key='csv-selected' onClick={() => this.clickExportSelected('csv')}><Translate value='articles.articles_toolbar.csv' /></li>,
      <li ref='rima-selected' key='rima-selected' onClick={() => this.clickExportSelected('rima')}><Translate value='articles.articles_toolbar.rima' /></li>,
      <li ref='pdf' key='pdf' onClick={() => this.clickExportSelected('pdf')}><Translate value='articles.articles_toolbar.pdf' /></li>,
      <li ref='docx' key='docx' onClick={() => this.clickExportSelected('docx')}><Translate value='articles.articles_toolbar.docx' /></li>,
      <li ref='clippings' key='clippings' onClick={() => this.clickExportSelected('clippings')}><Translate value='articles.articles_toolbar.docx_clippings' /></li>,
      <li ref='print' key='print' onClick={() => this.clickExportSelected('print')}><Translate value='articles.articles_toolbar.print' /></li>
    ];

    // All of the export options always available (Export All)
    const exportAllOptions = [
      <li ref='all-heading' key='all-heading' className='heading'><Translate value='articles.articles_toolbar.export_all' count={numeral(totalCount).format('0,0')} /></li>,

      <li ref='csv-all' key='csv-all' onClick={() => this.clickExportAll('csv')}><Translate value='articles.articles_toolbar.csv' /></li>,
      <li ref='rima-all' key='rima-all' onClick={() => this.clickExportAll('rima')}><Translate value='articles.articles_toolbar.rima' /></li>
    ];

    // Evaluate which options are available depending on our 'selectedCount' state
    const options = (selectedCount > 0) ? [...exportSelectedOptions, ...exportAllOptions] : exportAllOptions;

    return (
      <div className={'dropdown export-dropdown no-caret' + dropdownClassName}>

        <span className='toggle' onClick={this.toggleDropdown}><SVGIconExport /> <Translate value='articles.articles_toolbar.export' /></span>

        <ul ref='menu' className='menu' onMouseLeave={this.toggleDropdown}>
          {options}
        </ul>

      </div>
    );

  }

}


export default ExportMultipleArticles;
