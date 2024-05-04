from RS import Content_Base
from RS import Collaborative_Filtering
from RS import data_function
import sys

def listRecommend():
    cb_rs = Content_Base.CB('movies.csv')
    cb_rs.fit()
    cb_rs.get_recommendations('Coco', 9)

def list_Collaborative_Filtering():
    data_matrix = data_function.get_dataframe_ratings_base('ub.base')
    cf_rs = Collaborative_Filtering.CF(data_matrix, k=2, uuCF=1)
    cf_rs.fit()
    
    list_name_movie = data_function.get_name_movie('u.item')
    list_year_movie = data_function.get_year_movie('u.item')

    # nhập id của người dùng
    # user = int(input("Nhập id của người dùng:\n"))
    #list_movies = cf_rs.recommend_top(user,200)

    # print("aa")
    # list_movies = cf_rs.recommend_top(10,200)
    # for i in range(200):
    #     print( list_movies[i]['similar'], 2,
    #                           list_name_movie[list_movies[i]['id']],
    #                           list_year_movie[list_movies[i]['id']] )

def abc():
    print(1)

#if len(sys.argv) > 2:
#    abc(sys.argv[2])

if __name__ == "__main__":
    if len(sys.argv) > 1:
        if sys.argv[1] == "listRecommend":
            listRecommend()
        elif sys.argv[1] == "list_Collaborative_Filtering":
            list_Collaborative_Filtering()
        elif sys.argv[1] == "listUserNotRecommend":
            abc()
        else:
            print("Hàm không tồn tại.")
    else:
        print("Vui lòng cung cấp tên của hàm cần gọi.")