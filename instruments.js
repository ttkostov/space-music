//помощен файл за създаване на музикалните инструменти
//Всяка функция изчертава съответния инструмент и връща 3D обект.
//Добавена е и функция, която връща Extruded Mesh от зареден SVG файл,
//която ще ползвам, за да заменям ставите на човечетата с музикални символи

//първо ще създадем пиано чрез ExtrudeGeometry и готови фигури
function CreatePiano() {
  //първо създаваме материала за пианото
  var textureForPiano = new THREE.TextureLoader().load('textures/piano-texture.png');
  textureForPiano.wrapS = textureForPiano.wrapT = THREE.MirroredRepeatWrapping;
  textureForPiano.repeat.set(0.01, 0.01);

  var textureForKeyboard = new THREE.TextureLoader().load('textures/piano-keyboard.png');
  var materialForKeyboard = [];

  for (var counter = 0; counter < 6; counter++) { //keys are only on top side

    if (counter == 2) {
      materialForKeyboard.push(new THREE.MeshPhongMaterial({ map: textureForKeyboard, shininess: 100 }));
    }
    else {
      materialForKeyboard.push(new THREE.MeshPhongMaterial({ map: textureForPiano, shininess: 100 }));
    }
  }
  var materialForPiano = new THREE.MeshPhongMaterial({ map: textureForPiano, shininess: 100 });

  //crating piano

  var piano = new THREE.Object3D;
  var extrudeGeometryDepth = 130; //this is actually the width of the piano

  //big part of the piano (upper and lower panel)
  var pianoPartOne = new THREE.Shape();
  pianoPartOne.moveTo(-19.69, -47.24);
  pianoPartOne.lineTo(3.13, -47.24);
  pianoPartOne.lineTo(3.13, -47.24);
  pianoPartOne.lineTo(3.13, 44.53);
  pianoPartOne.lineTo(4.51, 44.53);
  pianoPartOne.lineTo(4.51, 47.24);
  pianoPartOne.lineTo(-19.69, 47.24);
  pianoPartOne.lineTo(-19.69, -47.24);

  var geometryPianoPartOne = new THREE.ExtrudeGeometry(pianoPartOne, { depth: extrudeGeometryDepth, bevelEnabled: false });
  var pianoPartOneReady = new THREE.Mesh(geometryPianoPartOne, materialForPiano);

  //side parts on keyboard
  var pianoPartTwo = new THREE.Shape();
  pianoPartTwo.moveTo(2.84, -5.99);
  pianoPartTwo.quadraticCurveTo(2.84, 0.13, 9.74, 0.13);
  pianoPartTwo.lineTo(19.9, 0.13);
  pianoPartTwo.lineTo(19.9, 5.92);
  pianoPartTwo.quadraticCurveTo(19.9, 9.52, 15.52, 9.52);
  pianoPartTwo.lineTo(7.01, 9.52);
  pianoPartTwo.quadraticCurveTo(2.84, 9.52, 2.84, 12.97);

  var geometryPianoPartTwo = new THREE.ExtrudeGeometry(pianoPartTwo, { depth: 7, bevelEnabled: false });
  var pianoPartTwoReady = new THREE.Mesh(geometryPianoPartTwo, materialForPiano);

  var geometryPianoPartThree = new THREE.ExtrudeGeometry(pianoPartTwo, { depth: 7, bevelEnabled: false });
  var pianoPartThreeReady = new THREE.Mesh(geometryPianoPartThree, materialForPiano);
  pianoPartThreeReady.position.set(0, 0, extrudeGeometryDepth - 7)

  //keyboard
  var geometryPianoPartFour = new THREE.BoxGeometry(17, 5, extrudeGeometryDepth - 14);
  var pianoPartFourReady = new THREE.Mesh(geometryPianoPartFour, materialForKeyboard);
  pianoPartFourReady.position.set(10, 3, extrudeGeometryDepth / 2);

  //piano legs
  var pianoPartFive = new THREE.Shape();
  pianoPartFive.moveTo(3.13, -47.24);
  pianoPartFive.lineTo(19.69, -47.24);
  pianoPartFive.quadraticCurveTo(19.69, -43.92, 13.24, -43.92);
  pianoPartFive.lineTo(3.13, -43.92);

  var geometryPianoPartFive = new THREE.ExtrudeGeometry(pianoPartFive, { depth: 7, bevelEnabled: false });
  var pianoPartFiveReady = new THREE.Mesh(geometryPianoPartFive, materialForPiano);

  var geometryPianoPartSix = new THREE.ExtrudeGeometry(pianoPartFive, { depth: 7, bevelEnabled: false });
  var pianoPartSixReady = new THREE.Mesh(geometryPianoPartSix, materialForPiano);
  pianoPartSixReady.position.set(0, 0, extrudeGeometryDepth - 7);

  //vertical legs
  var pianoPartSeven = new THREE.Shape();
  pianoPartSeven.moveTo(13.52, 0.13);
  pianoPartSeven.lineTo(13.52, -0.46);
  pianoPartSeven.quadraticCurveTo(14.51, -0.46, 14.51, -1.36);
  pianoPartSeven.lineTo(13.52, -47.24);
  pianoPartSeven.lineTo(16.5, -47.24);
  pianoPartSeven.lineTo(17.28, -1.36);
  pianoPartSeven.quadraticCurveTo(17.28, -0.46, 18.35, -0.46);
  pianoPartSeven.lineTo(18.35, 0.13);

  var geometryPianoPartSeven = new THREE.ExtrudeGeometry(pianoPartSeven, { depth: 3, bevelEnabled: false });
  var pianoPartSevenReady = new THREE.Mesh(geometryPianoPartSeven, materialForPiano);
  pianoPartSevenReady.position.set(0, 0, 2);

  var geometryPianoPartEight = new THREE.ExtrudeGeometry(pianoPartSeven, { depth: 3, bevelEnabled: false });
  var pianoPartEightReady = new THREE.Mesh(geometryPianoPartEight, materialForPiano);
  pianoPartEightReady.position.set(0, 0, extrudeGeometryDepth - 2 - 3);

  piano.add(pianoPartOneReady, pianoPartTwoReady, pianoPartThreeReady, pianoPartFourReady, pianoPartFiveReady, pianoPartSixReady, pianoPartSevenReady, pianoPartEightReady);
  piano.rotation.y = -Math.PI / 2;
  piano.position.set(extrudeGeometryDepth / 2, 0, 0);
  return piano;
}

//creating a guitar by loading a silhouette from a .svg file and extruding it
//Part of the code was copied from the three.js documentation and little changes were made
function CreateGuitar() {

  var textureForGuitar = new THREE.TextureLoader().load('textures/guitar-texture.png');
  textureForGuitar.wrapS = textureForGuitar.wrapT = THREE.RepeatWrapping;
  textureForGuitar.repeat.set(0.05, 0.05);

  var guitar = new THREE.Object3D();
  var materialForGuitar = new THREE.MeshPhongMaterial({ map: textureForGuitar });
  var guitarLoader = new THREE.SVGLoader();
  guitarLoader.load
    ('svg/guitar.svg',
      //this function is being called by loading the fiel
      function (data) {
        var paths = data.paths;
        for (var i = 0; i < paths.length; i++) {
          var path = paths[i];
          var shapes = path.toShapes(true);
          for (var j = 0; j < shapes.length; j++) {
            var shape = shapes[j];
            var geometry = new THREE.ExtrudeGeometry(shape, { depth: 3, bevelEnabled: false });
            geometry.center();
            var mesh = new THREE.Mesh(geometry, materialForGuitar);
            guitar.add(mesh);
          }
        }
      }
    );
  guitar.position.set(0, 0, -5);
  return guitar;
}

//creating drums from geometric shapes
function CreateDrums() {
  var drumSet = new THREE.Object3D();
  var innerPartsMaterial = new THREE.MeshPhongMaterial({ color: 0xd2dad8 });
  var textureForDrums = new THREE.TextureLoader().load('textures/drums-texture.png');
  textureForDrums.wrapS = textureForDrums.wrapT = THREE.RepeatWrapping;
  var outerPartsMaterial = new THREE.MeshPhongMaterial({ map: textureForDrums });
  var holdersMaterial = new THREE.MeshPhongMaterial({ color: 0xb0b0b0 });
  var cymbalMaterial = new THREE.MeshPhongMaterial({ color: 0xfbc110 });

  //bass drum
  var bassDrum = new THREE.Object3D();
  var bassDrumInnerRadius = 14;
  var bassDrumOuterRadius = 16;

  var bassDrumInnerGeometry = new THREE.CylinderGeometry(bassDrumInnerRadius, bassDrumInnerRadius, 20, 15);
  bassDrumInnerGeometry.rotateX(Math.PI / 2);
  var bassDrumInner = new THREE.Mesh(bassDrumInnerGeometry, innerPartsMaterial);

  var bassDrumOuterGeometry = new THREE.CylinderGeometry(bassDrumOuterRadius, bassDrumOuterRadius, 18, 32);
  bassDrumOuterGeometry.rotateX(Math.PI / 2);
  var bassDrumOuter = new THREE.Mesh(bassDrumOuterGeometry, outerPartsMaterial);

  //legs for the bass drum

  var bassDrumLegsGeometry = new THREE.BoxGeometry(1, bassDrumOuterRadius, 1);
  var bassDrumLegsArray = [] //four legs
  for (var i = 0; i <= 3; i++) {
    bassDrumLegsArray.push(new THREE.Mesh(bassDrumLegsGeometry, holdersMaterial));
  }
  bassDrumLegsArray[0].position.set(-bassDrumInnerRadius, -bassDrumInnerRadius / 2, bassDrumOuterRadius / 2 - 2);
  bassDrumLegsArray[1].position.set(-bassDrumInnerRadius, -bassDrumInnerRadius / 2, -bassDrumOuterRadius / 2 + 2);
  bassDrumLegsArray[2].position.set(bassDrumInnerRadius, -bassDrumInnerRadius / 2, bassDrumOuterRadius / 2 - 2);
  bassDrumLegsArray[3].position.set(bassDrumInnerRadius, -bassDrumInnerRadius / 2, -bassDrumOuterRadius / 2 + 2);

  var bassDrumLegs = new THREE.Object3D();
  bassDrumLegs.add(bassDrumLegsArray[0], bassDrumLegsArray[1], bassDrumLegsArray[2], bassDrumLegsArray[3]);

  bassDrum.add(bassDrumInner, bassDrumOuter, bassDrumLegs);
  drumSet.add(bassDrum);

  //hanging toms
  var hangingToms = new THREE.Object3D();

  //holder from bass drum to hanging toms
  var hangingTomsHolderLength = 30;
  hangingTomsHolderGeometry = new THREE.BoxGeometry(2, hangingTomsHolderLength, 2)
  var hangingTomsHolder = new THREE.Mesh(hangingTomsHolderGeometry, holdersMaterial);
  hangingTomsHolder.position.set(0, bassDrumOuterRadius / 2, 0);
  hangingToms.add(hangingTomsHolder);

  //left and right holder
  hangingTomsLeftHolderGeometry = new THREE.BoxGeometry(6, 1, 1)
  var hangingTomsLeftHolder = new THREE.Mesh(hangingTomsLeftHolderGeometry, holdersMaterial);
  hangingTomsLeftHolder.position.set(-3, hangingTomsHolderLength / 2 + bassDrumOuterRadius / 2 - 1, 0)
  hangingTomsLeftHolder.rotateZ(-Math.PI / 8);
  hangingToms.add(hangingTomsLeftHolder);

  hangingTomsRightHolderGeometry = new THREE.BoxGeometry(6, 1, 1)
  var hangingTomsRightHolder = new THREE.Mesh(hangingTomsRightHolderGeometry, holdersMaterial);
  hangingTomsRightHolder.position.set(3, hangingTomsHolderLength / 2 + bassDrumOuterRadius / 2 - 1, 0)
  hangingTomsRightHolder.rotateZ(Math.PI / 8);
  hangingToms.add(hangingTomsRightHolder);

  //creating a tom and then copying it
  var hangingTomsInnerRadius = 6;
  var hangingTomsOuterRadius = 7;

  var hangingTomsInnerGeometry = new THREE.CylinderGeometry(hangingTomsInnerRadius, hangingTomsInnerRadius, 8, 15);
  var hangingTomsInner = new THREE.Mesh(hangingTomsInnerGeometry, innerPartsMaterial);

  var hangingTomsOuterGeometry = new THREE.CylinderGeometry(hangingTomsOuterRadius, hangingTomsOuterRadius, 7, 32);
  var hangingTomsOuter = new THREE.Mesh(hangingTomsOuterGeometry, outerPartsMaterial);

  var hangingTom = new THREE.Object3D();
  hangingTom.add(hangingTomsOuter, hangingTomsInner);

  //left and right tom
  var hangingTomLeft = hangingTom.clone();
  hangingTomLeft.position.set(-3 - 6 - 3, hangingTomsHolderLength / 2 + bassDrumOuterRadius / 2 + 2, 0);
  hangingTomLeft.rotateX(-Math.PI / 8);
  hangingTomLeft.rotateZ(-Math.PI / 8);

  var hangingTomRight = hangingTom.clone();
  hangingTomRight.position.set(+3 + 6 + 3, hangingTomsHolderLength / 2 + bassDrumOuterRadius / 2 + 2, 0);
  hangingTomRight.rotateX(-Math.PI / 8);
  hangingTomRight.rotateZ(Math.PI / 8);

  hangingToms.add(hangingTomLeft, hangingTomRight);
  drumSet.add(hangingToms);

  //left cymbal
  var cymbal = new THREE.Object3D();

  //cymbal holder (from cylinders)
  var cymbalHolder = new THREE.Object3D();

  //long part
  var longCymbalHolderHeight = 40;
  var longCymbalHolderGeometry = new THREE.CylinderGeometry(0.3, 0.5, longCymbalHolderHeight, 32);
  var longCymbalHolder = new THREE.Mesh(longCymbalHolderGeometry, holdersMaterial);
  longCymbalHolder.position.set(0, longCymbalHolderHeight / 2 - bassDrumOuterRadius, 0);

  //lower part
  var cymbalHolderStandHeight = 5;
  var cymbalHolderStandGeometry = new THREE.CylinderGeometry(0.3, 6, cymbalHolderStandHeight, 9);
  var cymbalHolderStand = new THREE.Mesh(cymbalHolderStandGeometry, holdersMaterial);
  cymbalHolderStand.position.set(0, cymbalHolderStandHeight / 2 - bassDrumOuterRadius, 0);

  cymbalHolder.add(longCymbalHolder, cymbalHolderStand);

  cymbal.add(cymbalHolder);

  //cymbal plate
  var cymbalPlateGeometry = new THREE.CylinderGeometry(12, 12, 0.5, 32);
  var cymbalPlate = new THREE.Mesh(cymbalPlateGeometry, cymbalMaterial);
  cymbalPlate.position.set(0, longCymbalHolderHeight / 2 + cymbalHolderStandHeight / 2, 0);
  cymbalPlate.rotateX(-Math.PI / 12);
  cymbalPlate.rotateZ(-Math.PI / 8);

  cymbal.add(cymbalPlate);
  cymbal.position.set(-30, 0, -10);

  drumSet.add(cymbal);

  //hi hat cymbal
  var HiHatCymbal = new THREE.Object3D();

  //long part
  var longHiHatCymbalHolderHeight = 30;
  var longHiHatCymbalHolderGeometry = new THREE.CylinderGeometry(0.3, 0.5, longHiHatCymbalHolderHeight, 32);
  var longHiHatCymbalHolder = new THREE.Mesh(longHiHatCymbalHolderGeometry, holdersMaterial);

  HiHatCymbal.add(longHiHatCymbalHolder);

  //lower part
  var hiHatCymbalHolderStandHeight = 5;
  var hiHatCymbalHolderStandGeometry = new THREE.CylinderGeometry(0.3, 6, hiHatCymbalHolderStandHeight, 9);
  var hiHatCymbalHolderStand = new THREE.Mesh(hiHatCymbalHolderStandGeometry, holdersMaterial);
  hiHatCymbalHolderStand.position.set(0, hiHatCymbalHolderStandHeight / 2 - bassDrumOuterRadius, 0);

  HiHatCymbal.add(hiHatCymbalHolderStand);

  //hi hat cymbal plate
  var hiHatCymbalPlateGeometry = new THREE.CylinderGeometry(8, 8, 0.3, 32);
  var hiHatCymbalPlateUpper = new THREE.Mesh(hiHatCymbalPlateGeometry, cymbalMaterial);
  var hiHatCymbalPlateLower = new THREE.Mesh(hiHatCymbalPlateGeometry, cymbalMaterial);
  hiHatCymbalPlateUpper.position.set(0, longHiHatCymbalHolderHeight / 2, 0);
  hiHatCymbalPlateLower.position.set(0, longHiHatCymbalHolderHeight / 2 - 1, 0);

  HiHatCymbal.add(hiHatCymbalPlateUpper, hiHatCymbalPlateLower);
  HiHatCymbal.position.set(25, 0, -10);
  drumSet.add(HiHatCymbal);

  //one more cymbal on the right
  var secondCymbal = cymbal.clone();
  secondCymbal.position.set(37, 0, -5);
  secondCymbal.rotateY(Math.PI / 2);

  drumSet.add(secondCymbal);

  return drumSet;
}


//stools for drumer and pianist, also from basic geometric objects
function CreateStool() {
  var stool = new THREE.Object3D();
  var stoolMaterial = new THREE.MeshPhongMaterial({ color: 0xe6ffff });
  var stoolPartOneGeometry = new THREE.CylinderGeometry(0.3, 0.5, 15, 32);
  stoolPartOne = new THREE.Mesh(stoolPartOneGeometry, stoolMaterial);
  stoolPartTwo = stoolPartOne.clone();
  stoolPartThree = stoolPartOne.clone();
  var stoolPartFourGeometry = new THREE.CylinderGeometry(7, 6, 3, 32);
  stoolPartFour = new THREE.Mesh(stoolPartFourGeometry, stoolMaterial);
  stoolPartOne.position.set(0, 0, 5);
  stoolPartTwo.position.set(-4, 0, -3);
  stoolPartThree.position.set(4, 0, -3);
  stoolPartFour.position.set(0, 9, 0);
  stool.add(stoolPartOne, stoolPartTwo, stoolPartThree, stoolPartFour);
  return stool;
}

//sticks for the drumer from basic geometric objects
function CreateDrumStick() {
  var drumStickMaterial = new THREE.MeshPhongMaterial({ color: 0x5a4446 });
  var drumStickGeometry = new THREE.CylinderGeometry(0.4, 0.5, 12, 32);
  var drumStick = new THREE.Mesh(drumStickGeometry, drumStickMaterial);
  drumStick.rotation.z = Math.PI / 2;
  drumStick.position.set(6, 3, 0);
  return drumStick;
}


//function that takes an .svg file and creates an extrude mesh

function CreateAnSVGExtrudeMesh(pathToSVG, material, extrusionDepth) {
  var finishedObject = new THREE.Object3D();
  var finishedObjectLoader = new THREE.SVGLoader();
  finishedObjectLoader.load
    (
      pathToSVG, function (data) //adapted from the three.js documentation
    {
      var paths = data.paths;
      for (var i = 0; i < paths.length; i++) {
        var path = paths[i];
        var shapes = path.toShapes(true);
        for (var j = 0; j < shapes.length; j++) {
          var shape = shapes[j];
          var geometry = new THREE.ExtrudeGeometry(shape, { depth: extrusionDepth, bevelEnabled: false });
          geometry.center();
          var mesh = new THREE.Mesh(geometry, material);
          finishedObject.add(mesh);
        }
      }
    }
    )
  return finishedObject;
}
