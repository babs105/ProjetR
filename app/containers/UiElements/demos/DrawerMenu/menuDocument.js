// This file is shared across the demos.

import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import GroupIcon from '@material-ui/icons/Group';
import EventIcon from '@material-ui/icons/Event';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import HourglassFullIcon from '@material-ui/icons/HourglassFull';
import DeleteIcon from '@material-ui/icons/Delete';
import ReportIcon from '@material-ui/icons/Report';
import { Link } from 'react-router-dom';

export const DocumentListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <InsertDriveFileIcon />
      </ListItemIcon>
      <ListItemText primary="Document" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <EventIcon />
      </ListItemIcon>
      <ListItemText primary="Events" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AvTimerIcon />
      </ListItemIcon>
      <ListItemText primary="Planning" />
    </ListItem>
    <ListItem button component={Link} to="/app/caseWorker" state="">
      <ListItemIcon>
        <GroupIcon />
      </ListItemIcon>
      <ListItemText primary="CaseWorker" />
    </ListItem>
  </div>
);

export const otherDocumentListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <HourglassFullIcon />
      </ListItemIcon>
      <ListItemText primary="Process" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DeleteIcon />
      </ListItemIcon>
      <ListItemText primary="delete" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ReportIcon />
      </ListItemIcon>
      <ListItemText primary="info" />
    </ListItem>
  </div>
);
