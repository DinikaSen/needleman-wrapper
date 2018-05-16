require('mocha');
const assert = require('assert');
import { expect } from 'chai';
import {should} from 'chai';
import {stdout} from "test-console";

let restoreStdout;

import needlemanW from '../lib/needlemanW';

describe('#Align an unaligned sequence file', function () {
    it('should execute command with no error', function (done) {
        const inspect = stdout.inspect();
        needlemanW.alignFile('src/test/samples/example.fasta',2,-2,-10,function(err){
            if (err) {
                console.log(err);
            }
            else {
                console.log('Success.!');
            }
            inspect.restore();
            assert.deepEqual(inspect.output[0], "Success.!\n");
            done();
        });
    });

    it('should give message that file does not exist', function (done) {
        const inspect = stdout.inspect();
        needlemanW.alignFile('src/test/samples/examples.fasta',2,-2,-10,function(err){
            if (err) {
                console.log(err);
            }
            else {
                console.log('Success.!');
            }
            inspect.restore();
            assert.deepEqual(inspect.output[0], 'Input file does not exist\n');
            done();
        });
    });
});

describe('#Align an unaligned sequence file and return scores with alignment', function () {
    it('should execute command with no error', function (done) {
        const inspect = stdout.inspect();
        needlemanW.alignFileGetScore('src/test/samples/example.fasta',2,-2,-10,function(err){
            if (err) {
                console.log(err);
            }
            else {
                console.log('Success.!');
            }
            inspect.restore();
            assert.deepEqual(inspect.output[0], "Success.!\n");
            done();
        });
    });
});

describe('#Align an unaligned sequence file and return score matrices with alignment', function () {
    it('should execute command with no error', function (done) {
        const inspect = stdout.inspect();
        needlemanW.alignFileGetScore('src/test/samples/example.fasta',2,-2,-10,function(err){
            if (err) {
                console.log(err);
            }
            else {
                console.log('Success.!');
            }
            inspect.restore();
            assert.deepEqual(inspect.output[0], "Success.!\n");
            done();
        });
    });
});

describe('#Align a pair of sequence inputs', function () {
    it('should execute command with no error', function (done) {
        let inspect = stdout.inspect();
        let sequence1 = 'AADBFGTRHYSRRFDERSGVSDEAERSG';
        let sequence2 = 'AADGTDRSYSRFFDERTSDNDBSHRDSG';
        needlemanW.alignPair(sequence1,sequence2,2,-2,-10,function(err){
            if (err) {
                console.log(err);
            }
            else {
                console.log('Success.!');
            }
            inspect.restore();
            assert.deepEqual(inspect.output[0], "Success.!\n");
            done();
        });
    });
});


describe('#Align a pair of sequence inputs and return score with alignment', function () {
    it('should execute command with no error', function (done) {
        let inspect = stdout.inspect();
        let sequence1 = 'AADBFGTRHYSRRFDERSGVSDEAERSG';
        let sequence2 = 'AADGTDRSYSRFFDERTSDNDBSHRDSG';
        needlemanW.alignPairGetScore(sequence1,sequence2,2,-2,-10,function(err){
            if (err) {
                console.log(err);
            }
            else {
                console.log('Success.!');
            }
            inspect.restore();
            assert.deepEqual(inspect.output[0], "Success.!\n");
            done();
        });
    });
});

describe('#Align a pair of sequence inputs and return score matrix with alignment', function () {
    it('should execute command with no error', function (done) {
        let inspect = stdout.inspect();
        let sequence1 = 'AADBFGTRHYSRRFDERSGVSDEAERSG';
        let sequence2 = 'AADGTDRSYSRFFDERTSDNDBSHRDSG';
        needlemanW.alignPairGetMatrix(sequence1,sequence2,2,-2,-10,function(err){
            if (err) {
                console.log(err);
            }
            else {
                console.log('Success.!');
            }
            inspect.restore();
            assert.deepEqual(inspect.output[0], "Success.!\n");
            done();
        });
    });
});

