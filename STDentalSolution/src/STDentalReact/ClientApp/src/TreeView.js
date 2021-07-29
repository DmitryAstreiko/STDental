import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

const data = {
  id: 'root',
  name: '1 Ортопедия',
  children: [
    {
      id: '1',
      name: 'Child - 1',
    },
    {
      id: '3',
      name: 'Child - 3',
      children: [
        {
          id: '4',
          name: 'Child - 4',
        },
      ],
    },
  ],
};

const data2 = {

  content: [
    {
      id: '2',
      fullName: 'Child - 1',
      shifr: '1.1',
    },
    {
      id: '3',
      fullName: 'Child - 3',
      shifr: '1.2',
      content: [
        {
          id: '7',
          fullName: 'Child - 4',
          shifr: '1.2.1',
        },
        {
          id: '8',
          fullName: 'Child - 4',
          shifr: '1.2.2',
        },
      ],
    },
  ],
 
};

const tree = [{
  text: '1 Ортопедия',
  expanded: true,
  items: [{
    text: '1.1'
  }, {
    text: '1.2',
    items : [
      {
        text: '1.2.1',
        items: [
          {
            text: '1.2.1.1'
          },
          {
            text: '1.2.1.2'
          }
        ],
        text: '1.2.2',
        items: [
          {
            text: '1.2.2.1'
          },
          {
            text: '1.2.2.2'
          }
        ]
      }
    ]
  }, {
    text: 'Occasional Furniture'
  }]
}, {
  text: '2 Зуботехнические',
  items: [{
    text: 'Bed Linen'
  }, {
    text: 'Curtains & Blinds'
  }, {
    text: 'Carpets'
  }]
}];

const useStyles = makeStyles({
  root: {
    height: 110,
    flexGrow: 1,
    //maxWidth: 400,
  },
});

export default function TreeViewServices(props) {
  const classes = useStyles();

  const renderTree1 = (nodes) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children) ? nodes.items.map((node) => renderTree(node)) : null}
    </TreeItem>
  );

  const renderTree2 = (nodes) => (
      nodes.map((node, index) => 
          (node.shifr.length <= 2) && (
              <TreeItem id={node.id} nodeId={node.id} label={node.fullName}>                    
              </TreeItem>
          )
      )
      
  );

  const renderTree4 = (nodes) => {
    return nodes.map(node => {
      let qqq = node.shifr;

      if(node.shifr.length <= 2) {
        return (
          <TreeItem id={node.id} 
            nodeId={node.id} 
            label={node.fullName}></TreeItem>
        )
      }
      else if(node.shifr.length <= 2) {
        return (
          <TreeItem id={node.id} 
            nodeId={node.id} 
            label={node.fullName}>
              
            </TreeItem>
        )
      }
    })
  }

  const renderTree = (nodes) => {
    return nodes.map(node => {
      if(!node.items) {
        return (
          <TreeItem id={node.id} 
            nodeId={node.id} 
            label={node.fullName}></TreeItem>
        );
      }
      else {
        return (
          <TreeItem id={node.id} 
            nodeId={node.id} 
            label={node.fullName}>
              {renderTree(node.content)}
            </TreeItem>
        )
      }
    });
  };
    

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={['root']}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {/*{renderTree(props.actualServices)}*/}
      {renderTree1(tree)}
    </TreeView>
  );
}
