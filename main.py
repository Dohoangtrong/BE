from RS import Content_Base
import sys

def listRecommend():
    cb_rs = Content_Base.CB('movies.csv')
    cb_rs.fit()
    cb_rs.get_recommendations('Heat (1995)', 10)

def abc():
    print(1)

#if len(sys.argv) > 2:
#    abc(sys.argv[2])

if __name__ == "__main__":
    if len(sys.argv) > 1:
        if sys.argv[1] == "listRecommend":
            listRecommend()
        elif sys.argv[1] == "listUserNotRecommend":
            abc()
        else:
            print("Hàm không tồn tại.")
    else:
        print("Vui lòng cung cấp tên của hàm cần gọi.")