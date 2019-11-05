import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Divider, Grid, Segment } from 'semantic-ui-react';
import news from '../news.json';

const Div = styled.div`
  margin-top: 2rem;
`;

const NewsStructure = ({ className }) => {
  return (
    <Div className={className}>
      <Grid>
        <Grid.Column mobile={16} tablet={8} computer={8}>
          <Segment raised>
            <h2>{news.mainTitle}</h2>
            <Divider />
            {news.content.map((section, i) =>
              <div key={i}>
                <h3>{section.header}</h3>
                {section.text.map((part,ind) =>
                  <div key={ind} dangerouslySetInnerHTML={ {__html: part.part} } />
                )}
                <Divider />
              </div>
            )}
          </Segment>
        </Grid.Column>
      </Grid>
    </Div>
  );
};

const MyNews = styled(NewsStructure)`
  width: 100%;
  height: 100vh;
`;

NewsStructure.propTypes = {
  className: PropTypes.string,
};

export default MyNews;
