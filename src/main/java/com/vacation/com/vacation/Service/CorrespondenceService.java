package com.vacation.com.vacation.Service;

import com.vacation.com.vacation.Model.Correspondence;
import com.vacation.com.vacation.Model.Message;
import com.vacation.com.vacation.Repository.CorrespondenceRepository;
import com.vacation.com.vacation.Repository.MessageRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CorrespondenceService {
    private final CorrespondenceRepository correspondenceRepository;

    public CorrespondenceService( CorrespondenceRepository correspondenceRepository) {
        this.correspondenceRepository = correspondenceRepository;
    }
    public void addingCorrespondence(Correspondence correspondence) {
        correspondenceRepository.save(correspondence);

    };
    public List<Correspondence> getAllVacations() {;
        return correspondenceRepository.findAll();
    }
}
