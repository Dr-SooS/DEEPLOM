import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {TSI} from "../models/TSI";
import {HttpClient} from "@angular/common/http";
import {HostService} from "./host.service";
import {BaseService} from "./base.service";

@Injectable()
export class TSIsService extends BaseService{

  constructor(protected http: HttpClient, protected host: HostService)
  {
    super(http, host);
  }

  getTSIs(): Observable<TSI[]> {
    return this.http.get<TSI[]>(this.host.host + "/api/TSIs");
  }

  getTeacherTSIs(teacherId: number): Observable<TSI[]> {
    return this.http.get<TSI[]>(this.host.host + "/api/TSIs/teacher/" + teacherId);
  }

  getTSI(id: number): Observable<TSI> {
    return this.http.get<TSI>(this.host.host + "/api/TSIs/" + id);
  }

  postTSI(tsi: TSI) {
    return this.http.post(this.host.host + "/api/TSIs", tsi);
  }

  putTSI(id: number,  tsi: TSI) {
    return this.http.put(this.host.host + "/api/TSIs/" + id, tsi);
  }

  deleteTSI(id: number) {
    return this.http.delete(this.host.host + "/api/TSIs/" + id);
  }
}
