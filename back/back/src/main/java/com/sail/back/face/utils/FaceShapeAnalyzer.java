package com.sail.back.face.utils;

import com.sail.back.face.model.dto.response.CoordinateDto;
import com.sail.back.face.model.entity.enums.FaceShape;

import java.util.ArrayList;
import java.util.function.DoubleUnaryOperator;

public class FaceShapeAnalyzer {
    static final Calculator calculator = new Calculator();

    public FaceShape shapeTypeAnalyzer(ArrayList<CoordinateDto> hairline, ArrayList<CoordinateDto> contourLeft, ArrayList<CoordinateDto> contourRight){
        int leftEnd = contourLeft.get(47).getX();
        int rightEnd = contourRight.get(47).getX();
        int leftEndHeight = contourLeft.get(47).getY();
        int rightEndHeight = contourRight.get(47).getY();
        int Height = (leftEndHeight+rightEndHeight)/2;

        int pointX = (contourRight.get(0).getX() + contourLeft.get(0).getX()) /2;
        int pointY = (contourRight.get(0).getY() + contourLeft.get(0).getY()) /2;

        CoordinateDto leftPoint = new CoordinateDto(Height, leftEnd);
        CoordinateDto rightPoint = new CoordinateDto(Height, rightEnd);
        CoordinateDto centerPoint = new CoordinateDto(pointY, pointX);

        DoubleUnaryOperator function = calculator.createQuadraticEquation(leftPoint, rightPoint, centerPoint);

        double quadraticLength = calculator.calculateLength(function, leftEnd,  rightEnd);
        double ellipseLength = calculator.calculateLength((double) (rightEnd-leftEnd), (double) (2*(pointY-Height)), (double) leftEnd, (double) rightEnd, 1000);
        double squareLength = 2*(rightEnd-leftEnd)+ pointY-Height;
        double faceLength = 0;
        for(int i = 0; i < 47; i++){
            faceLength += calculator.distance(contourLeft.get(i), contourLeft.get(i+1));
            faceLength += calculator.distance(contourRight.get(i), contourRight.get(i+1));
        }
        faceLength += calculator.distance(contourRight.get(0), contourLeft.get(0));

        double triShape = Math.abs(faceLength-quadraticLength);
        double ovalShape = Math.abs(faceLength-ellipseLength);
        double squareShape = Math.abs(faceLength-squareLength);

        if (triShape <= ovalShape && triShape <= squareShape) {
            return  FaceShape.TRIANGLE;
        } else if (ovalShape <= triShape && ovalShape <= squareShape) {
            int faceHigh = hairline.get(calculator.findMinimalY(hairline)).getY();
            int faceLow = contourLeft.get(calculator.findMaximalY(contourLeft)).getY();
            double faceHeight = faceLow-faceHigh;
            int faceLeft = hairline.get(calculator.findMinimalX(hairline)).getX();
            int faceRight = hairline.get(calculator.findMaximalX(hairline)).getX();
            double faceWidth = faceRight-faceLeft;

            double compareValue = faceHeight/faceWidth;

            if(compareValue < 1.5){
                return FaceShape.ROUND;
            }else {
                return FaceShape.LONG;
            }
        } else {
            return  FaceShape.RECTANGLE;
        }


    }

}
