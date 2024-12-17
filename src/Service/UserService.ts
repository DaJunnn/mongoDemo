import { Service } from "../abstract/Service";
import { DBResp } from "../interfaces/DBResp";
import { Student } from "../interfaces/Student";
import { studentsModel } from "../orm/schemas/studentSchemas";
import { resp } from "../utils/resp";

export class UserService extends Service {
    // 取得所有學生
    public async getAllStudents(): Promise<Array<DBResp<Student>> | undefined> {
        try {
            const res: Array<DBResp<Student>> = await studentsModel.find({});
            return res;
        } catch (error) {
            console.error("取得所有學生錯誤:", error);
            return undefined;
        }
    }

    /**
     * 根據 ID 刪除學生
     * 業務:
     * 1. 檢查id是否存在
     * 2. 存在: 直接刪
     * 3. 不存在: error
     * @param id 
     * @returns 
     */
    public async deleteById(id: string) {

        const response: resp<any> = {
            code: 200,
            message: "",
            body: undefined,
        };

        try {

            /**
             * 有　/ 沒有
             */
            const user: DBResp<Student> | null = await studentsModel.findById(id);
            if (!user) {
                response.code = 404;
                response.message = "找不到該用戶，請確認 ID 是否正確。";
            } else {
                const result =  await studentsModel.deleteOne({_id:id});
                response.message = "刪除成功";
                response.body = result;
            }
        } catch (error) {
            console.error("刪除用戶錯誤:", error);
            response.code = 500;
            response.message = "伺服器錯誤";
        }

        return response;
    }

    // 新增一筆學生資料
    public async insertOne(info: Student): Promise<resp<DBResp<Student> | undefined>> {
        const response: resp<DBResp<Student> | undefined> = {
            code: 200,
            message: "",
            body: undefined,
        };

        try {
            const current = await this.getAllStudents();

            if (current && current.length >= 200) {
                response.code = 403;
                response.message = "學生列表已滿";
                return response;
            }

            const nameValidator = await this.userNameValidator(info.userName);

            if (nameValidator !== "驗證通過") {
                response.code = 403;
                response.message = nameValidator;
                return response;
            }

            info.sid = String((current?.length || 0) + 1);
            info._id = undefined;

            const student = new studentsModel(info);
            response.body = await student.save();
            response.message = "新增成功";
        } catch (error) {
            console.error("新增學生錯誤:", error);
            response.code = 500;
            response.message = "伺服器錯誤";
        }

        return response;
    }

    // 更新姓名和缺席次數
    public async updateNameByID(id: string, name: string, absences: number) {
        const response: resp<DBResp<Student> | string> = {
            code: 200,
            message: "",
            body: "",
        };

        try {
            const user :DBResp<Student> | null = await studentsModel.findById(id);
            if (!user) {
                response.code = 404;
                response.message = "無效的 ID 格式";
                return response;
            }

            if (user) {
                user.name = name || user.name;
                user.absences = absences ?? user.absences;

                await user.save();
                response.body = user;
                response.message = "更新成功";
            } else {
                response.code = 404;
                response.message = "找不到該用戶";
            }
        } catch (error) {
            console.error("更新用戶錯誤:", error);
            response.code = 500;
            response.message = "伺服器錯誤";
        }

        return response;
    }

    // 驗證學生名稱
    private async userNameValidator(userName: string): Promise<string> {
        if (userName.length < 7) return "學生名字格式不正確";

        const info = this.userNameFormator(userName);

        if (info.schoolName !== "tku") return "校名必須為 tku";
        if (!/^\d{4}$/.test(info.seatNumber)) return "座號格式不正確";

        if (await this.existingSeatNumbers(info.seatNumber)) return "座號已存在";

        return "驗證通過";
    }

    private userNameFormator(userName: string) {
        return {
            schoolName: userName.slice(0, 3),
            department: userName.slice(3, userName.length - 4),
            seatNumber: userName.slice(-4),
        };
    }

    private async existingSeatNumbers(seatNumber: string): Promise<boolean> {
        const students = await this.getAllStudents();
        return students
            ? students.some((s) => this.userNameFormator(s.userName).seatNumber === seatNumber)
            : false;
    }
}
