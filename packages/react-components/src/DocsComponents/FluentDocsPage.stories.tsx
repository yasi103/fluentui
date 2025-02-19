import * as React from 'react';
import {
  DocsContext,
  ArgsTable,
  Title,
  Subtitle,
  Description,
  HeaderMdx,
  Primary,
  PRIMARY_STORY,
  Stories,
} from '@storybook/addon-docs';
import { makeStyles, shorthands } from '@griffel/react';
import { Toc, nameToHash } from './Toc.stories';
import { isHosted } from './isHosted';

const useStyles = makeStyles({
  divider: {
    height: '1px',
    backgroundColor: '#e1dfdd',
    ...shorthands.border('0px', 'none'),
    ...shorthands.margin('48px', '0px'),
  },
  wrapper: {
    display: 'flex',
    ...shorthands.gap('16px'),
  },
  toc: {
    flexBasis: '200px',
    flexShrink: 0,
    [`@media screen and (max-width: 1000px)`]: {
      display: 'none',
    },
  },
  container: {
    flexGrow: 1,
  },
  // style overrides for when hosted in website
  hosted: {
    '& h1': {
      marginTop: '-12px !important',
    },
  },
});

export const FluentDocsPage = () => {
  const context = React.useContext(DocsContext);
  const stories = context.storyStore.getStoriesForKind(context.kind);
  const primaryStory = stories[0];
  const hosted = isHosted();
  const styles = useStyles();
  // DEBUG
  // console.log('FluentDocsPage', context);
  // console.table(stories.map((s: StoreItem) => ({ id: s.id, kind: s.kind, name: s.name, story: s.story })));
  // console.table(
  //   Object.values((context as any).argTypes).map(arg => ({
  //     name: arg.name,
  //     description: arg.description,
  //     type: arg.table?.type?.summary ?? '?',
  //     default: arg.table?.defaultValue?.summary ?? '-',
  //   })),
  // );

  return (
    <div className={hosted ? styles.hosted : ''}>
      <Title />

      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Subtitle />
          <Description />
          <hr className={styles.divider} />
          <HeaderMdx as="h3" id={nameToHash(primaryStory.name)}>
            {primaryStory.name}
          </HeaderMdx>
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </div>
        <div className={styles.toc}>
          <Toc stories={stories} />
        </div>
      </div>
    </div>
  );
};
