from RS import ContentBaseRS as a
import sys

def listRecommend():
    a.proc()

def abc():
    print(1)

if __name__ == "__main__":
    if len(sys.argv) > 1:
        if sys.argv[1] == "listRecommend":
            listRecommend()
        elif sys.argv[1] == "abc":
            abc()
        else:
            print("Hàm không tồn tại.")
    else:
        print("Vui lòng cung cấp tên của hàm cần gọi.")
#hello()