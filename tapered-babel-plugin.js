module.exports = function({types: t}) {
  return {
    visitor: {
      Program(path, state) {
        // console.log("filename" ,state.file.opts);
        // if there are comments in the program file
        if (path.parent.comments.length) {
          const comments = path.parent.comments
          // loop through the comments
          for (let i = 0; i < comments.length; i += 1) {
            // console.log('comments', path.parent.comments[i].value)
            const reqFileName = "const " + state.file.opts.sourceMapTarget.slice(0, state.file.opts.sourceMapTarget.length - 3) + " = require('" + state.file.opts.filename + "');";
            // if a comments requires Tape then replace with complete require statement
            // TODO FIX TAPE SYNTAX!!!!!!!!!
            // let reqTestFile = "";
            // let fileSaved = [];
            // if (comments[i].value.includes("%tapered") || comments[i].value.includes("%g")) {
            //     let reqSplit = comments[i].value.split("%");
            //       console.log("split", reqSplit)
            //     for(var req = 0; req < reqSplit.length; req++) {
            //         //checks if it has tapered to add the "file route"
            //         if (reqSplit[req].includes('tapered')) {
            //             reqTestFile += reqFileName + "\n";
            //             if (fileSaved[reqTestFile]) {
            //               reqTestFile = "";
            //             } else {
            //               fileSaved.push(reqTestFile);
            //             }
            //         }
            //         // checks if it contains global variables
            //         if (reqSplit[req] !== undefined && /\S/.test(reqSplit[req]) && reqSplit[req][0].includes('g')) {
            //           reqTestFile +=  reqSplit[req].slice(1).replace(/\r\n/, "\n").split(/\n/)[0].replace(/^[ ]+|[ ]+$/g, '') + "\n";
            //           if (fileSaved[reqTestFile]) {
            //             reqTestFile = "";
            //           } else {
            //             fileSaved.push(reqTestFile);
            //           }
            //         }
            //         //checks if other required frameworks have been declared
            //         if (reqSplit[req] !== undefined && /\S/.test(reqSplit[req]) && !reqSplit[req].includes('tapered') && !reqSplit[req][0].includes('g')) {
            //           reqTestFile += "const " + reqSplit[req].toLowerCase().replace(/\r\n/, "\n").split(/\n/)[0].replace(/^[ ]+|[ ]+$/g, '') + " = require('" + reqSplit[req].toLowerCase().replace(/\r\n/, "\n").split(/\n/)[0].replace(/^[ ]+|[ ]+$/g, '') + "');\n";
            //           if (fileSaved[reqTestFile]) {
            //             reqTestFile = "";
            //           } else {
            //             fileSaved.push(reqTestFile);
            //           }
            //        }

            //      }
            //     comments[i].value = " ß∂dNß0j1" + reqTestFile;
            //   }
              if (comments[i].value.includes("%tapered")) {
                comments[i].value = " ß∂dNß0j1" + reqFileName;
              }
              if (comments[i].value.includes("%g")) {
                let globalStart = comments[i].value.indexOf("%g");
                console.log("golball", comments[i].value)
                comments[i].value = " ß∂dNß0j1" + comments[i].value.slice(globalStart+2).replace(/^[ ]+|[ ]+$/g, '');
              }
// ----------------------------------------------------------------------------
            // SECTION INCLUDES NAME/DESCRIPTION - ASSERTION AND VARIABLES
            // Split on squigglys/tildas
            if (comments[i].value.includes('>>:')) {
              let currcomments = comments[i].value.split(">>:");
              // currcomments[0] is empty
              // currcomments[1] = name/description and is required
              let test = ' ß∂dNß0j1test';
              let description = currcomments[1].replace(/\r\n/, "\n").split(/\n/)[0].replace(/^[ ]+|[ ]+$/g, '');
               //CHANGES JP
              if (description[0] === 'x' && description[1] === ':') {
                    description = description.slice(2).replace(/^[ ]+|[ ]+$/g, '');
                    test = ' ß∂dNß0j1test.skip';
              };
              if (description[0] === 'o' && description[1] === ':') {
                    description = description.slice(2).replace(/^[ ]+|[ ]+$/g, '');
                    test = ' ß∂dNß0j1test.only';
              };
              let actual;
              let expression;
              let expected;
              let errMessage;
              let resultOfAssertion = "";
              let assertion;
              let startIndExpression;
              let expressionEndPoint;
              let argumentLength = 0;
              let variables = "";
              let finalCommentsTranspiled = "";
              let endTest = "\t" + "t.end();" + "\n";
              // Helper function that splits the ASSERTION: actual, expected, and expression
              function assertions(string) {
                let argumentSplit = string.split("|");
                let threeArgExpression = [
                  "equal",
                  "notEqual",
                  "deepEqual",
                  "notDeepEqual",
                  "deepLooseEqual",
                  "notDeepLooseEqual",
                  "throws",
                  "doesNotThrow",
                  "same",
                  "notSame",
                  "strictSame",
                  "strictNotSame"
                ];
                let twoArgExpression = ["ok", "notOk", "error"];
                // Find the expression start index and end index
                for (let three = 0; three < threeArgExpression.length; three++) {
                  if (argumentSplit[0].indexOf(threeArgExpression[three]) !== -1) {
                     startIndExpression = argumentSplit[0].indexOf(threeArgExpression[three]);
                     expressionEndPoint = startIndExpression + threeArgExpression[three].length;
                     argumentLength = 3;
                  }
                }
                for (let two = 0; two < twoArgExpression.length; two++) {
                  if (argumentSplit[0].indexOf(twoArgExpression[two]) !== -1) {
                     startIndExpression = argumentSplit[0].indexOf(twoArgExpression[two]);
                     expressionEndPoint = startIndExpression + twoArgExpression[two].length;
                     argumentLength = 2;
                   }
                }
                // If assertion contains an error message
                if (argumentLength === 3) {
                    if (argumentSplit.length > 1) {
                      // console.log("1st", argumentSplit);
                      actual =  argumentSplit[0].slice(0, startIndExpression).replace(/^[ ]+|[ ]+$/g, '');
                      expression = argumentSplit[0].slice(startIndExpression, expressionEndPoint).replace(/^[ ]+|[ ]+$/g, '');
                      expected = argumentSplit[0].slice(expressionEndPoint).replace(/\r\n/, "\n").split(/\n/)[0];
                      let message = argumentSplit[1].replace(/\s*[\r\n]+\s*/g, "\n").split(/\n/)[0].replace(/^[ ]+|[ ]+$/g, '');
                      errMessage = "'" + message + "'";
                    }
                    // If assertion does not contain an error message
                    if (argumentSplit.length < 2) {
                      //  console.log("2nd", argumentSplit[0]);
                      actual =  argumentSplit[0].slice(0, startIndExpression).replace(/^[ ]+|[ ]+$/g, '');
                      expression = argumentSplit[0].slice(startIndExpression, expressionEndPoint).replace(/^[ ]+|[ ]+$/g, '');
                      expected = argumentSplit[0].slice(expressionEndPoint).replace(/\r\n/, "\n").split(/\n/)[0];
                      errMessage = "'" + "Error: " + description + "'";
                    }
                    resultOfAssertion = "\t" + "t." + expression + "(" + actual + ", " + expected + ", " + errMessage + ");" + "\n";
                    return resultOfAssertion;
                }
                if (argumentLength === 2) {
                  // console.log("length is 2")
                    if (argumentSplit.length > 1) {
                      // console.log("1st", argumentSplit);
                      expression = argumentSplit[0].slice(startIndExpression, expressionEndPoint).replace(/^[ ]+|[ ]+$/g, '');
                      expected = argumentSplit[0].slice(expressionEndPoint).replace(/\r\n/, "\n").split(/\n/)[0];
                      let message = argumentSplit[1].replace(/\s*[\r\n]+\s*/g, "\n").split(/\n/)[0].replace(/^[ ]+|[ ]+$/g, '');
                      errMessage = "'" + message + "'";
                    }
                    // If assertion does not contain an error message
                    if (argumentSplit.length < 2) {
                      //  console.log("2nd", argumentSplit[0]);
                      expression = argumentSplit[0].slice(startIndExpression, expressionEndPoint).replace(/^[ ]+|[ ]+$/g, '');
                      expected = argumentSplit[0].slice(expressionEndPoint).replace(/\r\n/, "\n").split(/\n/)[0];
                      errMessage = "'" + "Error: " + description + "'";
                    }
                    resultOfAssertion = "\t" + "t." + expression + "(" + expected + ", " + errMessage + ");" + "\n";
                    return resultOfAssertion;
                }
              }
              for (let index = 2; index < currcomments.length; index++) {
                  // if comments[index] is an assertion
                  if (currcomments[index].indexOf("a:") !== -1 && currcomments[index][0] === 'a' && currcomments[index][1] === ':') {
                    // console.log("this is assertion", currcomments[index].slice(2).replace(/^[ ]+|[ ]+$/g, ''));
                      assertion = assertions(currcomments[index].slice(2).replace(/^[ ]+|[ ]+$/g, ''));
                      finalCommentsTranspiled += assertion;
                  }
                  // if currcomments[index] is a variable (optional)
                  if (currcomments[index][0] !== 'a' && currcomments[index][1] !== ':' && currcomments[index] !== undefined && /\S/.test(currcomments[index])) {

                    let splitVariable = currcomments[index].replace(/\r\n/, "\n").split(/\n/);
                    for(let eachVar = 0; eachVar < splitVariable.length; eachVar++) {
                      variables += "\t" + splitVariable[eachVar].replace(/^[ ]+|[ ]+$/g, '') + "\n";
                    }
                    finalCommentsTranspiled += variables;
                    variables = "";
                  }
                  //if curcomments[index] is ending in plan
                  if (currcomments[index].indexOf("p:") !== -1 && currcomments[index][0] === 'p' && currcomments[index][1] === ':') {
                    // let plan  = "\t" + currcomments[index].slice(2).replace(/^[ ]+|[ ]+$/g, '');
                    let planInput = currcomments[index].slice(2).replace(/\s/g, '');
                    endTest = '';
                    finalCommentsTranspiled += `\tt.plan(${planInput});\n`
                  }
              }
              comments[i].value = test + "('" + description + "', function (t) {" + "\n" + finalCommentsTranspiled +  endTest + "});" ;
            }
          }
        }
      }
    }
  };
}
