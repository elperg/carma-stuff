import React, { PropTypes } from 'react';
import { Translate, Localize } from 'react-redux-i18n';
import _ from 'lodash';
import numeral from 'numeral';

// When using babel!svg-react!, we need to actually crawl up the tree, (aliases aren't working)
import SVGIconExport from 'babel!svg-react!../../../lib/svg/icon_export.svg?name=SVGIconExport';

export class ExportSingleArticle extends React.Component {

  static propTypes = {
    exportSingleArticle : PropTypes.func.isRequired
  };

  state = {
    isOpen          : false
  };

  constructor(props, context) {
    super(props, context);
    _.bindAll(this, 'clickExport', 'toggleDropdown');
  }

  toggleDropdown() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  clickExport(format) {
    this.props.exportSingleArticle(format);
  }

  render() {

    const { totalCount, selectedCount } = this.props;

    const dropdownClassName =  (this.state.isOpen === true) ? ' dropdown--open' : '';

    return (
      <div className={'dropdown export-dropdown no-caret' + dropdownClassName}>

        <span className='toggle' onClick={this.toggleDropdown}><SVGIconExport /> <Translate value='articles.articles_toolbar.export' /></span>

        <ul ref='menu' className='menu' onMouseLeave={this.toggleDropdown}>
          <li ref='csv-selected' key='csv-selected' onClick={() => this.clickExport('csv')} className='menu__item export-selected menu__link'><Translate value='articles.articles_toolbar.csv' /></li>,
          <li ref='rima-selected' key='rima-selected' onClick={() => this.clickExport('rima')} className='menu__item export-selected menu__link'><Translate value='articles.articles_toolbar.rima' /></li>,
          <li ref='pdf' key='pdf' onClick={() => this.clickExport('pdf')} className='menu__item export-selected menu__link'><Translate value='articles.articles_toolbar.pdf' /></li>,
          <li ref='docx' key='docx' onClick={() => this.clickExport('docx')} className='menu__item export-selected menu__link'><Translate value='articles.articles_toolbar.docx' /></li>,
          <li ref='clippings' key='clippings' onClick={() => this.clickExport('clippings')} className='menu__item export-selected menu__link'><Translate value='articles.articles_toolbar.docx_clippings' /></li>,
          <li ref='print' key='print' onClick={() => this.clickExport('print')} className='menu__item export-selected menu__link'><Translate value='articles.articles_toolbar.print' /></li>
        </ul>

      </div>
    );

  }

}


export default ExportSingleArticle;
