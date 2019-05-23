//var assert = require('assert');
//var expect = require('chai').expect;
//var should = require('chai').should();
import User from '../src/controllers/user';
import { expect } from 'chai';
import {initDbConnection} from '../db-connection';
import dotenv from 'dotenv';
dotenv.config();

// Test connection because it is necesarry to test User retrieval

     it('should return true if the user email is already in use', async function (done) {
             try {
                await initDbConnection().connect();
                const userController = await new User;
                expect(userController.checkIfExists('skra@gmail.com')).to.equal(Object);
                done();
             } catch(err) {
                done(err);
             }
        });

   /* 

        ○ Unit tests will be created for at least 3 methods/functions. 
        ○ Each unit test will include at least 5 assertions. 
        ○ At least 2 assertions will return true. 
        ○ At least 2 assertions will return false.
        ○ At least one data provider will be implemented. 

   */