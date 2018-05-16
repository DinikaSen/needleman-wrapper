import child_process from 'child_process';
import fs from 'fs';
import path from 'path';

const needlemanW = {};

/*
Align 2 sequences.
 */
needlemanW.alignPair = (sequence1, sequence2, matchScore, misMatchScore, gapScore, callback) => {
    stringAlignment(sequence1,sequence2,'no','no',matchScore,misMatchScore,gapScore,callback);
}

/*
Align 2 sequences and output alignment along with score.
 */
needlemanW.alignPairGetScore = (sequence1, sequence2, matchScore, misMatchScore, gapScore, callback) => {
    stringAlignment(sequence1,sequence2,'yes','no',matchScore,misMatchScore,gapScore,callback);
}

/*
Align 2 sequences and output alignment along with score matrix.
 */
needlemanW.alignPairGetMatrix = (sequence1, sequence2, matchScore, misMatchScore, gapScore, callback) => {
    stringAlignment(sequence1,sequence2,'no','yes',matchScore,misMatchScore,gapScore,callback);
}

/*
Align sequence file. Read 2 sequences at a time and align them.
 */
needlemanW.alignFile = (inputFile, matchScore, misMatchScore, gapScore, callback) => {
    fileAlignment(inputFile,'no','no',matchScore,misMatchScore,gapScore,callback);
}

/*
Align sequence file. Read 2 sequences at a time.
Output pairwise alignment along with score.
 */
needlemanW.alignFileGetScore = (inputFile, matchScore, misMatchScore, gapScore, callback) => {
    fileAlignment(inputFile,'yes','no',matchScore,misMatchScore,gapScore,callback);
}

/*
Align sequence file. Read 2 sequences at a time.
Output pairwise alignment along with score matrix.
 */
needlemanW.alignFileGetMatrix = (inputFile, matchScore, misMatchScore, gapScore, callback) => {
    fileAlignment(inputFile,'no','yes',matchScore,misMatchScore,gapScore,callback);
}


function stringAlignment(sequence1, sequence2, scoreFlag, matrixFlag, matchScore, misMatchScore, gapScore, callback) {
    let command = `./needleman_wunsch --match ${matchScore} --mismatch ${misMatchScore} --gapopen ${gapScore} --colour `;
    if (scoreFlag === 'yes') {
        command += (`--printscores ${sequence1} ${sequence2}`);
    }
    else if (matrixFlag === 'yes') {
        command += (`--printmatrices ${sequence1} ${sequence2}`);
    } else {
        command += (`${sequence1} ${sequence2}`);
    }
    run(command, (err, stdOut, stdError) => callback(err, stdOut, stdError));
}

function fileAlignment(inputFile, scoreFlag, matrixFlag, matchScore, misMatchScore, gapScore, callback) {
    if (fs.existsSync(inputFile)){
        let command = `./needleman_wunsch --match ${matchScore} --mismatch ${misMatchScore} --gapopen ${gapScore} --colour `;
        if (scoreFlag === 'yes') {
            command += '--printscores ';
        }
        else if (matrixFlag === 'yes') {
            command += '--printmatrices ';
        }
        command += (`--file ${path.resolve(inputFile)}`);
        run(command, (err, stdOut, stdError) => callback(err, stdOut, stdError));
    }else{
        const err = 'Input file does not exist';
        return callback(err,null);
    }

}

function run(command, callback) {
    const execLocation = path.resolve(path.join(__dirname,'../util/seq-align/bin'));
    const fullCommand = `${execLocation}/${command}`;
    child_process.exec(fullCommand, {maxBuffer: 1024 * 1000}, callback);
}

module.exports = needlemanW;