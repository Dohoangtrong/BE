import { exec }  from 'child_process'

export const getListRecommendFilm = async (req, res, next) => {
    try{
        exec('python main.py listRecommend', (error, stdout, stderr) => {
            if (error) {
                res.status(500).json({errors: error.message})
                console.error(`Lỗi: ${error.message}`);
                return;
            }
            if (stderr) {
                res.status(500).json({errors: stderr.message})
                console.error(`Lỗi tiêu chuẩn: ${stderr}`);
                return;
            }
            console.log(`Kết quả: ${stdout}`);
            req.list_recommend = stdout;
            next();
        });
    } catch(error) {
        res.status(504).json({ errors: error.message })
    }
}
    
export const listUserNotRecommend = async (req, res, next) => {
    try{
        exec('python main.py list_Collaborative_Filtering', (error, stdout, stderr) => {
        if (error) {
            res.status(500).json({errors: error.message})
            console.error(`Lỗi: ${error.message}`);
            return;
        }
        if (stderr) {
            res.status(500).json({errors: stderr.message})
            console.error(`Lỗi tiêu chuẩn: ${stderr}`);
            return;
        }
        console.log(`Kết quả: ${stdout}`);
        res.status(200).json({ message: 'done!' })
        });
    } catch(error) {
        res.status(504).json({ errors: error.message })
    }
}