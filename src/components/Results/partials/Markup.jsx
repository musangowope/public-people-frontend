import React from 'react';
import PropTypes from 'prop-types';
import styles from './../styles.module.scss';
import Card from './../../Card';
import BounceWrap from './../../BounceWrap';
import Placeholder from './../../Placeholder';

const buildResults = results => results.map((item, index) => (
  <div
    key={item.id}
    className={styles.item}
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    <Card
      title={item.name}
      link
      footer="Unknown amount of events"
      height={250}
    >
      <span className="font-bold block">Position Unknown</span>
      <span className="block italic">Organisation Unknown</span>
    </Card>
  </div>
));


export default function Markup(props) {
  const {
    loading,
    error,
    results,
    phrase,
  } = props;

  if (error === 'no-resuls') {
    return <div>No results were found for this search. Please try another search term</div>;
  }

  if (loading) {
    return [0, 1, 2, 3].map(index => (
      <div key={index} className={styles.item}>
        <BounceWrap delay={index * 0.2}>
          <Placeholder utils="rounded-4" height={250} />
        </BounceWrap>
      </div>
    ));
  }

  if (error) {
    return (
      <BounceWrap>
        <div className="text-center">
          <Card highlighted title="Error" utils="max-w-4 ml-auto mr-auto">Something went wrong. Please try again at a later stage</Card>
        </div>
      </BounceWrap>
    );
  }

  if (results.length < 1) {
    return (
      <BounceWrap>
        <div className="text-center">
          <Card highlighted title="No people found" utils="max-w-4 ml-auto mr-auto">No result was found matching the query &ldquo;{phrase}&rdquo;, please try another phrase.</Card>
        </div>
      </BounceWrap>
    );
  }

  return (
    <div className={styles.root}>
      {results ? buildResults(results) : null}
    </div>
  );
}


Markup.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  results: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })),
  phrase: PropTypes.string.isRequired,
};


Markup.defaultProps = {
  loading: false,
  error: null,
  results: [],
};
