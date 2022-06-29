
import * as React from 'react'

import {Link} from 'react-router-dom';
import { useContext } from 'react';
import { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

import {database, storage} from '../firebase'

function Feed() {
  return (
    <div>feed</div>
  )
}

export default Feed