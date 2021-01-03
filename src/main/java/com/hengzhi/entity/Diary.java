package com.hengzhi.entity;

public class Diary {

    private Integer diaryId;

    private Integer userId;

    private String info;

    private String time;

    public int getDiaryId() {
        return diaryId;
    }

    public void setDiaryId(int diaryId) {
        this.diaryId = diaryId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public Diary(Integer diaryId, Integer userId, String info, String time) {
        this.diaryId = diaryId;
        this.userId = userId;
        this.info = info;
        this.time = time;
    }

    public Diary() {
        super();
    }
    @Override
    public String toString() {
        return "Diary{" +
                "diaryId=" + diaryId +
                ", userId=" + userId +
                ", info='" + info + '\'' +
                ", time='" + time + '\'' +
                '}';
    }

}
