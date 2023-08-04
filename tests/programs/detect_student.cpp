#include <opencv2/opencv.hpp>
#include <iostream>

void refine_with_grabCut(cv::Mat image);

int main(int argc, char **argv) {
	cv::CascadeClassifier faceCascade;
    std::string faceCascadeFile = "cascade/haarcascade_frontalface_alt.xml";

    if (!faceCascade.load(faceCascadeFile)) {
        std::cerr << "Error loading face cascade.\n";
        return -1;
    }

    cv::Mat image = cv::imread(argv[1]);
    if (image.empty()) {
        std::cerr << "Error loading image.\n";
        return -1;
    }

    cv::Mat grayImage;
    cv::cvtColor(image, grayImage, cv::COLOR_BGR2GRAY);

    std::vector<cv::Rect> faces;
    faceCascade.detectMultiScale(grayImage, faces, 1.3, 5);

	
	const double expand_factor = 0.5;

	faces[0].x -= faces[0].width * expand_factor;
	faces[0].width += faces[0].width * expand_factor * 2;
	faces[0].y -= faces[0].height * expand_factor;
	faces[0].height += faces[0].height * expand_factor * 2;

	cv::Mat just_face_image(image, faces[0]);

	refine_with_grabCut(just_face_image);

//	cv::rectangle(image, faces[0], cv::Scalar(0, 255, 0), 2);

//	cv::Rect r_left(0, 0, faces[0].width / 10, faces[0].height);
//	cv::Rect r_right(0 + faces[0].width - faces[0].width / 10, 0, faces[0].width / 10, faces[0].height);
//	cv::Rect r_center(0 + faces[0].width / 2 - faces[0].width / 10, 0 + faces[0].height / 2 - faces[0].height / 10, faces[0].width / 5, faces[0].height / 5);
//
//	cv::rectangle(just_face_image, r_left, cv::Scalar(0, 0, 255), 3);
//	cv::rectangle(just_face_image, r_right, cv::Scalar(0, 0, 255), 3);
//	cv::rectangle(just_face_image, r_center, cv::Scalar(255, 0, 0), 3);

//	cv::imshow("Detected Faces", just_face_image);
//	cv::waitKey(0);
}

//NEEDS TO DEFINE A NEW IMAGE FOR GRABCUTTING
void refine_with_grabCut(cv::Mat image)
{
    // Define the rectangle containing the person (you can use face detection for this step)
    // Create a mask of the same size as the image and initialize it with zeros
	
	const double all_factor  = 0.1;
	const double remove_factor = 0.2;
	
    cv::Mat mask(image.size(), CV_8UC1, cv::Scalar::all(cv::GC_BGD));
	cv::Rect r_left(0, 0, image.size().width * remove_factor, image.size().height);
	cv::Rect r_right(image.size().width - image.size().width * remove_factor, 0, image.size().width * remove_factor, image.size().height);
	cv::Rect r_center(image.size().width / 2 - image.size().width * 0.15, image.size().height / 2 - image.size().height * 0.15, image.size().width * 0.3, image.size().height * 0.3);
	cv::Rect all(image.size().width * all_factor, image.size().height * all_factor, image.size().width * (1 - all_factor * 2), image.size().height * (1 - all_factor * 2));

	cv::Mat fg_result;

    // Set the region of interest (ROI) in the mask to "probably foreground"
 //   mask(r_left).setTo(cv::GC_BGD);
  //  mask(r_right).setTo(cv::GC_BGD);

    // Perform GrabCut algorithm to segment the foreground from the background
   cv::grabCut(image, mask, all, cv::Mat(), fg_result, 3, cv::GC_INIT_WITH_RECT);
    mask(r_center).setTo(cv::GC_FGD);
    mask(r_left).setTo(cv::GC_BGD);
    mask(r_right).setTo(cv::GC_BGD);
    cv::grabCut(image, mask, all, cv::Mat(), fg_result, 3, cv::GC_INIT_WITH_MASK);

    // Modify the mask to keep only the foreground and probable foreground pixels

    // Create a 3-channel foreground image
    cv::Mat foregroundMask = (mask == cv::GC_FGD) | (mask == cv::GC_PR_FGD);
    cv::Mat foregroundImage(image.size(), CV_8UC3, cv::Scalar(0, 0, 0));

    // Copy the foreground pixels from the original image to the foreground image
    image.copyTo(foregroundImage, foregroundMask);

    // Display the output
	cv::rectangle(foregroundImage, r_center, cv::Scalar(255, 0, 0));
	cv::rectangle(foregroundImage, r_left, cv::Scalar(0, 0, 255));
	cv::rectangle(foregroundImage, r_right, cv::Scalar(0, 0, 255));
    cv::imshow("Person in Foreground", foregroundImage);
    cv::waitKey(0);
}
