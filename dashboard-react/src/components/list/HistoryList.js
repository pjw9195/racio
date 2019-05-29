import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody } from 'shards-react';

import moment from 'moment';
import _ from 'lodash';

import preview from '../../assets/images/preview.jpg';
import rightArrow from '../../assets/images/right_arrow.png';

class HistoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: props.data, isLoading: false };
    this.getMonth = this.getMonth.bind(this);
  }

  /* month date to String month */
  getMonth(month) {
    switch (month) {
      case '1':
        return 'JAN';
      case '2':
        return 'FEB';
      case '3':
        return 'MAR';
      case '4':
        return 'APR';
      case '5':
        return 'MAY';
      case '6':
        return 'JUN';
      case '7':
        return 'JUL';
      case '8':
        return 'AUG';
      case '9':
        return 'SEP';
      case '10':
        return 'OCT';
      case '11':
        return 'NOV';
      case '12':
        return 'DEC';
      default:
        return 'Undefined';
    }
  }

  render() {
    const { data, isLoading } = this.state;

    if (isLoading) return <p>Loading...</p>;

    /* Sort by recent date */
    data.sort((o1, o2) => {
      if (o1.date > o2.date) return -1;
      else if (o1.date < o2.date) return 1;
      else return 0;
    });

    const monthName = item => moment(item.date, 'YYYY-MM-DD').format('M');

    const resultData = _.groupBy(data, monthName);
    const resData = _.toPairs(resultData).sort((o1, o2) => {
      if (o1[0] > o2[0]) return -1;
      else if (o1[0] < o2[0]) return 1;
      else return 0;
    });

    const HistList = resData.map((els, idx) => (
      <Card key={idx} className="mb-4">
        <CardHeader className="border-bottom">
          <h6 className="m-0">{this.getMonth(els[0])}</h6>
        </CardHeader>

        <CardBody className="p-0">
          {els[1].map((el, idx) => (
            <div key={idx} className="blog-comments__item d-flex p-3">
              {/* Map preview part */}
              <div className="blog-comments__history mr-3">
                <img src={preview} alt="preview" />
              </div>
              {/* Content */}
              <div className="blog-comments__content">
                {/* Content :: Title */}
                <div className="blog-comments__meta text-mutes">
                  <span className="text-mutes">
                    {moment(el.date).format('YYYY-MM-DD')}
                  </span>
                </div>

                {/* Content :: Body */}
                <p className="m-0 my-1 mb-2 text-muted">
                  {moment(el.date).format('YYYY-MM-DD')}
                </p>

                {/* Content :: Title */}
                <div className="blog-comments__meta text-mutes">
                  <span className="text-mutes">
                    주행거리 : 10km, 최고 속도 : 9km/h
                  </span>
                </div>
              </div>
              {/* icon */}
              <div className="blog-comments__arrow mr-4">
                <img src={rightArrow} alt="arrow" />
              </div>
            </div>
          ))}
        </CardBody>
      </Card>
    ));

    return <>{HistList}</>;
  }
}

HistoryList.propTypes = {
  monthName: PropTypes.func,
  resultData: PropTypes.object,
  histList: PropTypes.array,
};

export default HistoryList;
