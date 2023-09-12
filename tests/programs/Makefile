all:
	g++ detect_student.cpp $(shell pkg-config --cflags --libs opencv4 --static) --std=c++11

asio:
	g++ asio.cpp detect_student.cpp $(shell pkg-config --cflags --libs opencv4 --static) -I ../boost_1_83_0 -L../boost_1_83_0/libs  -lpthread -o asio.out --std=c++11
